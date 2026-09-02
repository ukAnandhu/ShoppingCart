import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types/product";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export default function ProductDetails({
  product,
  onClose,
  onAdd,
}: ProductDetailsProps) {
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          ×
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="flex min-h-[350px] items-center justify-center rounded-2xl bg-slate-50 p-8 dark:bg-slate-800">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-[400px] w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
              {product.title}
            </h2>
            <span className="mt-4 w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {product.category}
            </span>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>

              <span className="text-sm text-slate-500 dark:text-slate-400">
                ⭐ {product.rating}
              </span>
            </div>

            <p className="mt-6 leading-7 text-slate-600 dark:text-slate-300">
              {product.description}
            </p>

            {/* Add to cart */}
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
        </div>
      </div>
    </div>
  );
}
