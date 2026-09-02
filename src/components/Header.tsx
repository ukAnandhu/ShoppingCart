interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function Header({
  cartCount,
  onCartClick,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <button
          className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          🛍️ ShopCart
        </button>

        <div className="flex items-center gap-3">

          {/* Theme Button */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-lg transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Cart */}
          <button
            type="button"
            className="rounded-xl bg-slate-900 px-4 py-2.5 font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            onClick={onCartClick}
          >
            Cart

            <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-sm text-slate-900 dark:bg-slate-900 dark:text-white">
              {cartCount}
            </span>
          </button>

        </div>
      </div>
    </header>
  )
}