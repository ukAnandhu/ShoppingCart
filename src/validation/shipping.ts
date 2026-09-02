import { z } from 'zod'

export const shippingSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z.email('Enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  address: z.string().trim().min(1, 'Address is required'),
  city: z.string().trim().min(1, 'City is required'),
  postalCode: z.string().trim().min(1, 'Postal code is required'),
})

export type ShippingForm = z.infer<typeof shippingSchema>