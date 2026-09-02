import type { CartItem } from '../types/product'

interface CartDrawerProps {
  items: CartItem[]
  subtotal: number
  onClose: () => void
  onRemove: (id: number) => void
  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onClear: () => void
  onCheckout: () => void
}

export default function CartDrawer({ items, subtotal, onClose, onRemove, onIncrease, onDecrease, onClear, onCheckout }: CartDrawerProps) {
  const checkoutDisabled = subtotal < 10

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="ml-auto flex h-full w-full max-w-md flex-col bg-white text-slate-900 shadow-2xl transition-colors duration-300 dark:bg-slate-900 dark:text-white">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div><h2 className="text-xl font-bold">Your Cart</h2><p className="text-sm text-slate-500 dark:text-slate-400">{items.length} product{items.length === 1 ? '' : 's'}</p></div>
          <button className="rounded-lg p-2 text-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" aria-label="Close cart" onClick={onClose}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="py-16 text-center"><div className="mb-3 text-5xl">🛒</div><h3 className="font-bold">Your cart is empty</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Add products to continue.</p></div>
          ) : items.map((item) => (
            <div key={item.id} className="flex gap-3 border-b border-slate-100 py-4 dark:border-slate-800">
              <img src={item.thumbnail} alt={item.title} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2">
                  <h3 className="line-clamp-2 text-sm font-bold">{item.title}</h3>
                  <button className="shrink-0 text-xs font-medium text-red-600 hover:underline dark:text-red-400" onClick={() => onRemove(item.id)}>Remove</button>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">${item.price.toFixed(2)} each</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700">
                    <button className="px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800" disabled={item.quantity <= 1} onClick={() => onDecrease(item.id)}>−</button>
                    <span className="border-x border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700">{item.quantity}</span>
                    <button className="px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800" disabled={item.quantity >= 5} onClick={() => onIncrease(item.id)}>+</button>
                  </div>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 p-5 dark:border-slate-800">
          <div className="mb-4 flex justify-between"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          {checkoutDisabled && items.length > 0 && <div className="mb-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 dark:border dark:border-amber-800">Checkout is disabled because the minimum cart value is $10.</div>}
          <div className="grid gap-2">
            <button className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:disabled:bg-slate-700 dark:disabled:text-slate-500" disabled={checkoutDisabled || items.length === 0} onClick={onCheckout}>Proceed to checkout</button>
            <button className="rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30" disabled={items.length === 0} onClick={onClear}>Clear cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}