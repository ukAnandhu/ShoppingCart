export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  thumbnail: string
}

export interface ProductApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface ShippingDetails {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}