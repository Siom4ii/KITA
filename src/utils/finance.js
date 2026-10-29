export const toCentavos = value => Math.round(Number(value || 0) * 100);
export const fromCentavos = cents => Number(cents || 0) / 100;
export const peso = cents => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(fromCentavos(cents));
export const saleTotal = sale => Number(sale.quantity || sale.qty || 0) * Number(sale.unitPrice ?? sale.price ?? 0);
export const saleCents = sale => toCentavos(saleTotal(sale));
export const paymentTotal = debt => (debt.payments || []).reduce((sum, payment) => sum + Number(payment.amountCents ?? toCentavos(payment.amount)), 0);
export const debtBalance = debt => Math.max(0, Number(debt.originalAmountCents ?? toCentavos(debt.amount)) - paymentTotal(debt));
export const debtStatus = (debt, date = new Date().toISOString().slice(0, 10)) => {
  const original = Number(debt.originalAmountCents ?? toCentavos(debt.amount));
  const balance = debtBalance(debt);
  return { paid: balance === 0 ? 'Fully Paid' : balance === original ? 'Unpaid' : 'Partially Paid', overdue: Boolean(debt.dueDate && debt.dueDate < date && balance > 0), balance };
};
export const sumSales = (sales, test = () => true) => sales.filter(test).reduce((sum, sale) => sum + saleCents(sale), 0);
export const sumExpenses = (expenses, test = () => true) => expenses.filter(test).reduce((sum, expense) => sum + Number(expense.amountCents ?? toCentavos(expense.amount)), 0);
export const inRange = (date, start, end) => date >= start && date <= end;
export const today = () => new Date().toISOString().slice(0, 10);
export const daysAgo = count => { const d = new Date(); d.setDate(d.getDate() - count); return d.toISOString().slice(0, 10); };
