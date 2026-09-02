import { z } from 'zod'
import type { ProductApiResponse } from '../types/product'

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  rating: z.number(),
  thumbnail: z.string().url(),
})

const ProductResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})
const API_URL = import.meta.env.VITE_API_URL;
export async function fetchProducts(): Promise<ProductApiResponse> {
  const response = await fetch(`${API_URL}/products?limit=24`)

  if (!response.ok) {
    throw new Error(`Unable to fetch products (${response.status})`)
  }

  const data: unknown = await response.json()
  return ProductResponseSchema.parse(data)
}