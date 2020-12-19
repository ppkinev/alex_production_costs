import React, { useState } from 'react'
import { FaGift } from 'react-icons/fa'
import services, { addNewItemText } from './items/services'
import { totalValue, totalCost } from './utils'
import Printable from './components/Printable'

const section = ({ currency, category, costItems, onItemAdd, onItemRemove, onItemUpdate }) => {
  const { name: categoryName, items } = category
  const onItemSelect = ({ target }) => {
    if (target.value !== addNewItemText) {
      onItemAdd({ categoryName, item: { name: target.value } })
    }
    target.value = addNewItemText
  }

  const options = [{ name: addNewItemText }, ...items].map(item => (
    <option key={item.name.toLowerCase()}>{item.name}</option>
  ))
  const dropdown = (
    <select onChange={onItemSelect}>
      {options}
    </select>
  )

  const forms = costItems.map((ci) => {
    const { name, hasQuantity, hasHours } = items.find(item => item.name === ci.name)
    const { id, quantity, hours, cost, costFree } = ci
    const onRemove = () => onItemRemove({ categoryName, id })
    const onUpdate = ({ target: { name, value, type, checked } }) => {
      onItemUpdate({ 
        categoryName, ...ci, [name]: type !== 'checkbox' ? Number(value) : checked,
      })
    }

    const quantityInput = hasQuantity ? (
      <div className="input-group input-group-sm">
        <label className="form-label">Количество (шт)
          <input
            className="form-control"
            type="number"
            step="1"
            min="1"
            name="quantity"
            value={quantity}
            onChange={onUpdate}
          />
        </label>
      </div>
    ) : null
    const hoursInput = hasHours ? (
      <div className="input-group input-group-sm">
        <label className="form-label">Часы (ч)
          <input
            className="form-control"
            type="number"
            step="1"
            min="1"
            name="hours"
            value={hours}
            onChange={onUpdate}
          />
        </label>
      </div>
    ) : null
    const costInput = (
      <div className="input-group input-group-sm">
        <label className="form-label">Стоимость ({currency})
          <input
            className="form-control"
            type="number"
            step="0.01"
            min="0"
            name="cost"
            value={cost}
            onChange={onUpdate}
          />
        </label>
      </div>
    )
    const costFreeCheck = (
      <div className="input-group form-check">
        <label className="form-check-label">
          <FaGift size={24} className={costFree ? 'text-primary' : 'text-secondary'} />
          <input
            className="form-check-input"
            type="checkbox"
            name="costFree"
            defaultChecked={false}
            onChange={onUpdate}
          />
        </label>
      </div>
    )
    const totalInput = (
      <div className="input-group input-group-sm">
        <label className="form-label">Итого
          <p className="m-0 form-control bg-success text-white">
            {totalValue({ quantity, hours, cost, costFree }).toFixed(2)} ({currency})
          </p>
        </label>
      </div>
    )

    const deleteItem = (
      <div className="input-group input-group-sm">
        <button type="button" className="btn-close" onClick={onRemove}></button>
      </div>
    )

    return (
      <div key={id} className="card">
        <div className="card-body">
          <h6 className="card-title">{name}</h6>

          <div className="d-flex flex-row justify-content-start align-items-center">
            {quantityInput}
            {hoursInput}
            {costInput}
            {costFreeCheck}
            {totalInput}
            {deleteItem}
          </div>
        </div>
      </div>
    )
  })

  return (
    <section className="mt-4" key={categoryName.toLowerCase()}>
      <h5>{categoryName}</h5>
      {dropdown}
      <div className="mt-3">
        {forms}
      </div>
    </section>
  )
}

const covertCost = (costItems, rate) => {
  const items = {}
  Object.entries(costItems).forEach(([categoryName, services]) => {
    items[categoryName] = []
    services.forEach(s => items[categoryName].push({ ...s, cost: Number((rate * s.cost).toFixed(2)) }))
  })

  return items
}

const CurrencyConverter = (props) => {
  const { setCostItems, setCurrency, rateState, backRateState } = props
  const [rate, setRate] = rateState
  const [backRate, setBackRate] = backRateState

  const onRateUpdate = ({ target: { value } }) => {
    if (value === '') setRate('')
    else setRate(Number(value))
  }
  const onCalculate = () => {
    setCurrency('грн')
    setCostItems(costItems => covertCost(costItems, rate))
    setBackRate(1 / rate)
  }
  const onCalculateBack = () => {
    setCurrency('$')
    setCostItems(costItems => covertCost(costItems, backRate))
    setBackRate(null)
  }

  return (
    <div>
      <div className="input-group input-group-sm">
        <label className="form-label">Курс грн.
          <input
            className="form-control"
            type="number"
            step="0.01"
            min="0"
            name="rate"
            value={rate}
            onChange={onRateUpdate}
            disabled={backRate}
          />
        </label>
      </div>
      <button 
        type="button" 
        onClick={onCalculate} 
        className="btn btn-sm btn-secondary"
        disabled={backRate}
      >
        В грн.
      </button>
      <button 
        type="button" 
        onClick={onCalculateBack} 
        className="btn btn-sm btn-secondary ms-2"
        disabled={!backRate}
      >
        В $
      </button>
    </div>
  )
}

function App() {
  const categories = services.reduce((acc, item) => (acc[item.name] = [], acc), {})
  const [currency, setCurrency] = useState('$')
  const rateState = useState(1)
  const backRateState = useState(null)
  const [isPrintable, setIsPrintable] = useState(false)
  const [costItems, setCostItems] = useState(categories)
  const onPrintableToggle = () => setIsPrintable(!isPrintable)
  const onItemAdd = ({ categoryName, item }) => {
    const id = Date.now()
    const currentCategory = costItems[categoryName]
    const currentService = services.find(s => s.name === categoryName)
    const { defaultCost } = currentService.items.find(service => service.name === item.name)
    currentCategory.push({ id, ...item, quantity: 1, hours: 1, cost: defaultCost || 0 })
    setCostItems({ ...costItems, [categoryName]: currentCategory })
  }
  const onItemRemove = ({ categoryName, id }) => {
    const currentCategory = costItems[categoryName]
    setCostItems({ ...costItems, [categoryName]: currentCategory.filter(it => it.id !== id) })
  }
  const onItemUpdate = ({ categoryName, id, ...item }) => {
    const currentCategory = costItems[categoryName]
    setCostItems({
      ...costItems,
      [categoryName]: currentCategory.map(it => it.id === id
        ? { ...it, ...item } : it
      ),
    })
  }

  const sections = services.map(category => section({
    currency,
    category,
    costItems: costItems[category.name],
    onItemAdd,
    onItemRemove,
    onItemUpdate,
  }))

  if (isPrintable) {
    return <Printable currency={currency} costItems={costItems} onPrintableToggle={onPrintableToggle} />
  }

  return (
    <main>
      <header className="sticky-top">
        <div className="header">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <CurrencyConverter
                setCostItems={setCostItems}
                setCurrency={setCurrency}
                rateState={rateState}
                backRateState={backRateState}
              />
              <div className="summary">
                <h4>Итого: {totalCost(costItems).toFixed(2)} ({currency})</h4>
                <button type="button" className="btn btn-sm btn-primary" onClick={onPrintableToggle}>
                  Предпечать
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {sections}
      </div>
    </main>
  )
}

export default App
