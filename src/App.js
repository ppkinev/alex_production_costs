import React, { useState } from 'react'
import services from './items/services'

const totalValue = ({ quantity = 1, hours = 1, cost = 0 }) => Number(quantity) * Number(hours) * Number(cost)
const totalPerCategory = items => items.reduce((acc, it) => {
  acc += totalValue({ quantity: it.quantity, hours: it.hours, cost: it.cost })
  return acc
}, 0)
const totalCost = costItems => totalPerCategory(Object.values(costItems).flat())

const section = ({ category, costItems, onItemAdd, onItemRemove, onItemUpdate }) => {
  const { name: categoryName, items } = category
  const newItemName = '+ Add Item'
  const onItemSelect = ({ target }) => {
    if (target.value !== newItemName) {
      onItemAdd({ categoryName, item: { name: target.value } })
    }
    target.value = newItemName
  }

  const options = [{ name: newItemName }, ...items].map(item => (
    <option key={item.name.toLowerCase()}>{item.name}</option>
  ))
  const dropdown = (
    <select onChange={onItemSelect}>
      {options}
    </select>
  )

  const forms = costItems.map((ci) => {
    const { name, unit, canBeStacked, isCalculatedCost } = items.find(item => item.name === ci.name)
    const { id, quantity, hours, cost } = ci
    const onRemove = () => onItemRemove({ categoryName, id })
    const onUpdate = ({ target: { name, value } }) => onItemUpdate({ 
      categoryName, ...ci, [name]: value,
    })

    const stackInput = canBeStacked ? (
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
    const hoursInput = !(isCalculatedCost || unit) ? (
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
        <label className="form-label">Стоимость ($)
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
    const totalInput = (
      <div className="input-group input-group-sm">
        <label className="form-label">Итого
          <p className="m-0 form-control bg-success text-white">
            ${totalValue({ quantity, hours, cost }).toFixed(2)}
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
            {stackInput}
            {hoursInput}
            {costInput}
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


const summaryTable = (costItems) => {
  const selectedItems = Object.entries(costItems).filter(([, serviceList]) => serviceList.length)
  const rows = selectedItems.map(([categoryName, serviceList]) => {
    const subHeader = (
      <tr key={categoryName} className="bg-light fw-bold">
        <td colSpan={5}>{categoryName}</td>
      </tr>
    )
    const items = serviceList.map(s => {
      const currentService = services.find(s => s.name === categoryName)
      const { unit, canBeStacked, isCalculatedCost } = currentService.items.find(service => service.name === s.name)
      return (
        <tr key={s.id}>
          <td>{s.name}</td>
          <td>{canBeStacked ? s.quantity : ''}</td>
          <td>{!(isCalculatedCost || unit) ? s.hours : ''}</td>
          <td>{s.cost}</td>
          <td>${totalValue({ quantity: s.quantity, hours: s.hours, cost: s.cost }).toFixed(2)}</td>
        </tr>
      )
    })
    return [subHeader, ...items]
  })
  const headers = (
    <tr key="headers">
      <td>Наименование</td>
      <td>Кол-во (шт)</td>
      <td>Часы</td>
      <td>Цена</td>
      <td>Стоимость</td>
    </tr>
  )
  const summary = (
    <tr key="summary" className="bg-light fw-bold">
      <td colSpan={5} className="text-end">Суммарно: ${totalCost(costItems).toFixed(2)}</td>
    </tr>
  )

  return (
    <table className="table table-bordered">
      <thead />
      <tbody>
        {[headers, ...rows, summary]}
      </tbody>
    </table>
  )
}

function App() {
  const categories = services.reduce((acc, item) => (acc[item.name] = [], acc), {})
  const [isPrintable, setIsPrintable] = useState(false)
  const [costItems, setCostItems] = useState(categories)
  const onPrintableToggle = () => setIsPrintable(!isPrintable)
  const onPrint = () => window.print()
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
  const onItemUpdate = ({ categoryName, id, quantity, hours, cost }) => {
    const currentCategory = costItems[categoryName]
    setCostItems({
      ...costItems,
      [categoryName]: currentCategory.map(it => it.id === id
        ? { ...it, quantity, hours, cost } : it
      ),
    })
  }

  const sections = services.map(category => section({ 
    category,
    costItems: costItems[category.name],
    onItemAdd,
    onItemRemove,
    onItemUpdate,
  }))

  if (isPrintable) {
    return (
      <div>
        <div className="header">
          <div className="container">
            Content First Studio
          </div>
        </div>
        <div className="container mt-4">
          {summaryTable(costItems)}
          <button
            type="button"
            className="btn btn-secondary d-print-none"
            onClick={onPrintableToggle}
          >
            Редактировать
          </button>
          <button
            type="button"
            className="btn btn-primary d-print-none ms-3"
            onClick={onPrint}
          >
            Распечатать
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-light">
      <header className="sticky-top">
        <div className="header">
          <div className="container">
            <div className="summary">
              <h4>Итого: ${totalCost(costItems).toFixed(2)}</h4>
              <button type="button" className="btn btn-sm btn-primary" onClick={onPrintableToggle}>
                Предпечать
              </button>
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

export default App;
