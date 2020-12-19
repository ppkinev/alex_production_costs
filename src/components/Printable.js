import { FaGift } from 'react-icons/fa'
import services from '../items/services'
import { totalValue, totalCost } from '../utils'

const summaryTable = (costItems, currency) => {
  const selectedItems = Object.entries(costItems).filter(([, serviceList]) => serviceList.length)
  const rows = selectedItems.map(([categoryName, serviceList]) => {
    const subHeader = (
      <tr key={categoryName} className="bg-light fw-bold">
        <td colSpan={5}>{categoryName}</td>
      </tr>
    )
    const items = serviceList.map(s => {
      const currentService = services.find(s => s.name === categoryName)
      const { hasHours, hasQuantity } = currentService.items.find(service => service.name === s.name)
      return (
        <tr key={s.id}>
          <td>{s.name}</td>
          <td className="text-end">{hasQuantity ? s.quantity : ''}</td>
          <td className="text-end">{hasHours ? s.hours : ''}</td>
          <td className="text-end">{s.cost.toFixed(2)} ({currency})</td>
          <td className={`text-end ${s.costFree ? 'text-primary' : ''}`}>
            {s.costFree ? <FaGift size={24} className="me-2" /> : null}
            {totalValue({ quantity: s.quantity, hours: s.hours, cost: s.cost, costFree: s.costFree }).toFixed(2)}
            {' '}
            ({currency})
          </td>
        </tr>
      )
    })
    return [subHeader, ...items]
  })
  const headers = (
    <tr key="headers">
      <td>Наименование</td>
      <td className="text-end">Кол-во (шт)</td>
      <td className="text-end">Часы</td>
      <td className="text-end">Цена</td>
      <td className="text-end">Стоимость</td>
    </tr>
  )
  const summary = (
    <tr key="summary" className="bg-light fw-bold">
      <td colSpan={5} className="text-end">Суммарно: {totalCost(costItems).toFixed(2)} ({currency})</td>
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

const Printable = (props) => {
  const { costItems, onPrintableToggle, currency } = props
  const onPrint = () => window.print()

  return (
    <div>
      <div className="header">
        <div className="container">
          Content First Studio
        </div>
      </div>
      <div className="container mt-4">
        {summaryTable(costItems, currency)}
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

export default Printable
