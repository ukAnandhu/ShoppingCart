import { useState } from "react";
import type { Product } from "../types/product";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onImageClick: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAdd,
  onImageClick,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.id === product.id),
  );

  const quantity = cartItem?.quantity ?? 0;
  const isMaxQuantity = quantity >= 5;

  const handleAdd = () => {
    if (isMaxQuantity) return;

    onAdd(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Product Image */}
      <button
        type="button"
        onClick={() => onImageClick(product)}
        className="group relative block h-52 w-full overflow-hidden"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </button>

      <div className="p-5">
        <h2 className="line-clamp-2 font-bold text-slate-900 dark:text-white">
          {product.title}
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {product.category}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-sm text-slate-500 dark:text-slate-400">
            ⭐ {product.rating}
          </span>
        </div>

        <button
          type="button"
          disabled={isMaxQuantity}
          className={`mt-4 w-full rounded-xl px-4 py-3 font-semibold text-white transition ${
            isMaxQuantity
              ? "cursor-not-allowed bg-slate-300"
              : added
                ? "bg-green-600"
                : "bg-slate-900 hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          }`}
          onClick={handleAdd}
        >
          {isMaxQuantity
            ? "Maximum quantity reached"
            : added
              ? "✓ Added"
              : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
