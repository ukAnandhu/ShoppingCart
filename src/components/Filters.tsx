interface FiltersProps {
  search: string
  setSearch: (value: string) => void
  category: string
  setCategory: (value: string) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
  categories: string[]
  onClear: () => void
}

export default function Filters({
  search, setSearch, category, setCategory, maxPrice, setMaxPrice, categories, onClear,
}: FiltersProps) {
  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1fr_auto] lg:items-end">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="search">Search by title</label>
          <input
            id="search"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-700"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="category">Category</label>
          <select
            id="category"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-700"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => <option key={item} value={item}>{item === 'all' ? 'All categories' : item}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="maxPrice">Max price ($)</label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-700"
            placeholder="e.g. 100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button
          className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={onClear}
        >
          Clear filters
        </button>
      </div>
    </section>
  )
}