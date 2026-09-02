import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";
import { fetchProducts } from "./api/products";
import { useProductFilters } from "./hooks/useProductFilters";
import { useCartStore } from "./store/cartStore";
import { calculateSubtotal } from "./utils/cart";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductDetails from "./components/ProductDetails";
import type { Product } from "./types/product";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  const products = data?.products ?? [];
  const filters = useProductFilters(products);
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items],
  );
  const subtotal = useMemo(() => calculateSubtotal(items), [items]);

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />
      <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Filters {...filters} onClear={filters.clearFilters} />
          {isLoading && (
            <div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              role="status"
              aria-label="Loading products"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          )}
          {isError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/40">
              <h2 className="font-bold text-red-900 dark:text-red-200">
                Could not load products
              </h2>
              <p className="my-2 text-sm text-red-700 dark:text-red-300">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong while fetching products."}
              </p>
              <button
                className="mt-3 rounded-xl border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/50"
                onClick={() => refetch()}
              >
                Try again
              </button>
            </div>
          )}
          {!isLoading && !isError && filters.filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 text-5xl">🔎</div>
              <h2 className="font-bold text-slate-900 dark:text-white">No products found</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or filters.
              </p>
              <button
                className="mt-4 rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={filters.clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}
          {!isLoading && !isError && filters.filteredProducts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filters.filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onImageClick={(selectedProduct) =>
                    setSelectedProduct(selectedProduct)
                  }
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* {cartOpen && (
        <CartDrawer
          items={items}
          subtotal={subtotal}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onClear={clearCart}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}
      {checkoutOpen && <Checkout onClose={() => setCheckoutOpen(false)} />} */}
      {cartOpen && (
        <CartDrawer
          items={items}
          subtotal={subtotal}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onClear={clearCart}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}

      {checkoutOpen && <Checkout onClose={() => setCheckoutOpen(false)} />}

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
        />
      )}
    </>
  );
}
