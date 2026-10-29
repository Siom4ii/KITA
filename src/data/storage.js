import { today } from '../utils/finance';

const key = 'kita-prototype-v2';
const id = prefix => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const date = offset => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); };

export const demoData = () => ({
  version: 2, session: null, plan: { name: 'Free', billingCycle: 'monthly', isSimulated: true },
  store: { configured: false, name: "Aling Nena's Sari-Sari Store", ownerName: 'Nena Santos', storeType: 'Sari-Sari Store', location: 'Digos City, Davao del Sur', contactNumber: '0917 555 0199', preferredLanguage: 'Filipino' },
  sales: [
    ['Softdrinks', 8, 25, 0], ['Pandesal', 20, 8, 0], ['Rice (1kg)', 5, 62, -1], ['Canned Goods', 10, 32, -2], ['Instant Noodles', 15, 16, -3], ['Coffee Sachets', 18, 10, -5], ['Eggs', 12, 9, -6], ['Bottled Water', 9, 20, -10]
  ].map(([itemName, quantity, unitPrice, offset]) => ({ id: id('sale'), itemName, quantity, unitPrice, transactionDate: date(offset), notes: '', createdAt: Date.now() })),
  expenses: [
    ['Inventory Purchase', 'Pambili ng paninda', 450, 0], ['Utilities', 'Kuryente', 120, 0], ['Transportation', 'Pamasahe', 75, -2], ['Store Supplies', 'Plastic at paper bags', 95, -5], ['Inventory Purchase', 'Dagdag na bigas', 600, -8]
  ].map(([category, description, amount, offset]) => ({ id: id('expense'), category, description, amountCents: amount * 100, expenseDate: date(offset), notes: '', createdAt: Date.now() })),
  customers: [
    ['Maria Santos', '0917 000 1001'], ['Juan Dela Cruz', '0917 000 1002'], ['Ana Reyes', '0917 000 1003'], ['Pedro Cruz', '0917 000 1004'], ['Liza Mendoza', '0917 000 1005'], ['Carlo Ramos', '0917 000 1006']
  ].map(([fullName, contactNumber]) => ({ id: id('customer'), fullName, contactNumber, address: 'Digos City', notes: '', createdAt: Date.now() })),
  debts: [], reminders: []
});

export const createDemo = () => {
  const data = demoData(); const [maria, juan, ana, pedro, liza] = data.customers;
  data.debts = [
    { id: id('debt'), customerId: maria.id, description: 'Grocery items', originalAmountCents: 50000, borrowedDate: date(-9), dueDate: date(-2), notes: '', payments: [{ id:id('payment'), amountCents: 20000, paymentDate: date(-5), notes: 'Partial payment' }] },
    { id: id('debt'), customerId: juan.id, description: 'Rice and canned goods', originalAmountCents: 35000, borrowedDate: date(-4), dueDate: date(3), notes: '', payments: [] },
    { id: id('debt'), customerId: ana.id, description: 'Meryenda', originalAmountCents: 18000, borrowedDate: date(-12), dueDate: date(-8), notes: '', payments: [{ id:id('payment'), amountCents:18000, paymentDate:date(-9), notes:'' }] },
    { id: id('debt'), customerId: pedro.id, description: 'Household essentials', originalAmountCents: 70000, borrowedDate: date(-15), dueDate: date(-4), notes: '', payments: [] },
    { id: id('debt'), customerId: liza.id, description: 'Bread and milk', originalAmountCents: 26000, borrowedDate: date(-8), dueDate: date(-1), notes: '', payments: [{ id:id('payment'), amountCents: 10000, paymentDate:date(-4), notes:'' }] }
  ]; return data;
};
export const loadData = () => { try { const data = JSON.parse(localStorage.getItem(key)); return data?.version === 2 ? data : createDemo(); } catch { return createDemo(); } };
export const saveData = data => localStorage.setItem(key, JSON.stringify(data));
export const clearData = () => localStorage.removeItem(key);
export const createId = id;
export { today };
