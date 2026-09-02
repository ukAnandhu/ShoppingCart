export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      
      {/* Image */}
      <div className="h-64 animate-pulse bg-slate-200 dark:bg-slate-800" />

      <div className="space-y-4 p-5">

        {/* Title */}
        <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        {/* Description */}
        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        {/* Price */}
        <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        {/* Button */}
        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

      </div>
    </div>
  )
}