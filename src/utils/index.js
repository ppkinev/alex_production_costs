export const totalValue = ({ quantity = 1, hours = 1, cost = 0, costFree = false }) => {
  return Number(quantity) * Number(hours) * Number(cost) * (costFree ? 0 : 1)
}
export const totalPerCategory = items => items.reduce((acc, it) => {
  acc += totalValue({
    quantity: it.quantity,
    hours: it.hours,
    cost: it.cost,
    costFree: it.costFree
  })
  return acc
}, 0)
export const totalCost = costItems => totalPerCategory(Object.values(costItems).flat())
