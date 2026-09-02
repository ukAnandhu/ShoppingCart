import type { CartItem } from '../types/product'

export const TAX_RATE = 0.05
export const DISCOUNT_RATE = 0.10
export const DISCOUNT_THRESHOLD = 100
export const MIN_CHECKOUT_VALUE = 10

export function calculateSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function calculateTax(subtotal: number) {
  return subtotal * TAX_RATE
}

export function calculateDiscount(subtotal: number) {
  return subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0
}

export function calculateTotal(subtotal: number, tax: number, discount: number) {
  return subtotal + tax - discount
}

export function calculateCartTotals(items: CartItem[]) {
  const subtotal = calculateSubtotal(items)
  const tax = calculateTax(subtotal)
  const discount = calculateDiscount(subtotal)
  const total = calculateTotal(subtotal, tax, discount)

  return { subtotal, tax, discount, total }
}