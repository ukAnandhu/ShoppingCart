import { useMemo, useState } from 'react'
import type { Product } from '../types/product'

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState('')

  const categories = useMemo(() => {
    return [
      'all',
      ...Array.from(
        new Set(products.map((product) => product.category))
      ).sort(),
    ]
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    // Empty price means no price filter
    const price =
      maxPrice.trim() === '' ? Infinity : Number(maxPrice)

    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearch)

      const matchesCategory =
        category === 'all' || product.category === category

      const matchesPrice =
        product.price <= price

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      )
    })
  }, [products, search, category, maxPrice])

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setMaxPrice('')
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
    clearFilters,
  }
}