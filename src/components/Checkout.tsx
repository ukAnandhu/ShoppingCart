import { useState } from 'react'
import type { ShippingDetails } from '../types/product'
import { shippingSchema } from '../validation/shipping'
import { calculateCartTotals } from '../utils/cart'
import { useCartStore } from '../store/cartStore'

interface CheckoutProps { onClose: () => void }

const initialForm: ShippingDetails = { fullName: '', email: '', phone: '', address: '', city: '', postalCode: '' }

export default function Checkout({ onClose }: CheckoutProps) {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<ShippingDetails>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingDetails, string>>>({})
  const [orderPlaced, setOrderPlaced] = useState(false)
  const totals = calculateCartTotals(items)

  const updateField = (field: keyof ShippingDetails, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const validateShipping = () => {
    const result = shippingSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ShippingDetails, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ShippingDetails
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  const nextStep = () => {
    if (step === 1 && totals.subtotal < 10) return
    if (step === 2 && !validateShipping()) return
    setStep((current) => Math.min(current + 1, 3))
  }

  const placeOrder = () => { setOrderPlaced(true); clearCart() }

  if (orderPlaced) return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl transition-colors duration-300 dark:bg-slate-900 dark:text-white">
        <div className="mb-4 text-6xl">✅</div><h2 className="text-2xl font-bold">Order placed successfully!</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Thank you, {form.fullName}. Your cart has been cleared.</p>
        <button className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" onClick={onClose}>Continue shopping</button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-xs sm:p-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-colors duration-300 dark:bg-slate-900 dark:text-white">
        <div className="flex justify-between border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
          <div><h2 className="text-2xl font-bold">Checkout</h2><p className="text-sm text-slate-500 dark:text-slate-400">Step {step} of 3</p></div>
          <button className="h-10 w-10 rounded-lg text-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" onClick={onClose} aria-label="Close checkout">✕</button>
        </div>

        <div className="grid grid-cols-3 gap-2 p-5 sm:p-6">
          {['Cart Review', 'Shipping', 'Payment Summary'].map((label, index) => (
            <div key={label} className={`flex flex-col items-center gap-2 text-center text-xs font-semibold sm:flex-row sm:text-sm ${step >= index + 1 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${step >= index + 1 ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 dark:text-slate-400'}`}>{index + 1}</span>{label}
            </div>
          ))}
        </div>

        <div className="p-5 sm:p-6">
          {step === 1 && <><h3 className="mb-4 text-lg font-bold">Cart Review</h3><div className="mb-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">{items.map((item) => <div key={item.id} className="flex justify-between gap-3 p-4 text-sm"><span>{item.title} × {item.quantity}</span><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>)}</div><Summary totals={totals} /></>}

          {step === 2 && <><h3 className="mb-4 text-lg font-bold">Shipping details</h3><div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" field="fullName" value={form.fullName} error={errors.fullName} onChange={updateField} />
            <Field label="Email" field="email" type="email" value={form.email} error={errors.email} onChange={updateField} />
            <Field label="Phone number" field="phone" value={form.phone} error={errors.phone} onChange={updateField} />
            <Field label="Address" field="address" value={form.address} error={errors.address} onChange={updateField} />
            <Field label="City" field="city" value={form.city} error={errors.city} onChange={updateField} />
            <Field label="Postal code" field="postalCode" value={form.postalCode} error={errors.postalCode} onChange={updateField} />
          </div></>}

          {step === 3 && <><h3 className="mb-4 text-lg font-bold">Payment Summary</h3><div className="mb-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><strong>Shipping details</strong><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{form.fullName}<br />{form.email} · {form.phone}<br />{form.address}, {form.city} - {form.postalCode}</p></div><div className="mb-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">{items.map((item) => <div key={item.id} className="flex justify-between gap-3 p-4 text-sm"><span>{item.title} × {item.quantity}</span><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>)}</div><Summary totals={totals} /></>}
        </div>

        <div className="flex justify-between gap-3 border-t border-slate-200 p-5 dark:border-slate-800 sm:p-6">
          <button className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" disabled={step === 1} onClick={() => setStep((current) => current - 1)}>Back</button>
          {step < 3 ? <button className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" onClick={nextStep}>Continue</button> : <button className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700" onClick={placeOrder}>Place Order</button>}
        </div>
      </div>
    </div>
  )
}

function Field({ label, field, type = 'text', value, error, onChange }: { label: string; field: keyof ShippingDetails; type?: string; value: string; error?: string; onChange: (field: keyof ShippingDetails, value: string) => void }) {
  return <div><label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor={field}>{label}</label><input id={field} type={type} className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition dark:bg-slate-800 dark:text-white ${error ? 'border-red-500 ring-2 ring-red-100 dark:ring-red-950' : 'border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:focus:border-slate-400 dark:focus:ring-slate-700'}`} value={value} onChange={(e) => onChange(field, e.target.value)} />{error && <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}</div>
}

function Summary({ totals }: { totals: ReturnType<typeof calculateCartTotals> }) {
  return <div className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800"><div className="flex justify-between"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div><div className="mt-2 flex justify-between"><span>Tax (5%)</span><span>${totals.tax.toFixed(2)}</span></div><div className="mt-2 flex justify-between"><span>Discount</span><span>-${totals.discount.toFixed(2)}</span></div><hr className="my-3 border-slate-200 dark:border-slate-700" /><div className="flex justify-between text-lg font-extrabold"><span>Final total</span><span>${totals.total.toFixed(2)}</span></div></div>
}