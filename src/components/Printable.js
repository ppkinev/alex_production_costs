import services from '../items/services'
import { totalValue, totalCost } from '../utils'

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

const Printable = (props) => {
  const { costItems, onPrintableToggle } = props
  const onPrint = () => window.print()

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

export default Printable
