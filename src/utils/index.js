export const totalValue = ({ quantity = 1, hours = 1, cost = 0 }) => Number(quantity) * Number(hours) * Number(cost)
export const totalPerCategory = items => items.reduce((acc, it) => {
  acc += totalValue({ quantity: it.quantity, hours: it.hours, cost: it.cost })
  return acc
}, 0)
export const totalCost = costItems => totalPerCategory(Object.values(costItems).flat())
