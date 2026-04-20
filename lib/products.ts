export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  images?: string[]
}

// ACOSA Event Registration Products
// Event registration fees for different event types
export const PRODUCTS: Product[] = [
  {
    id: 'tech-talks-event',
    name: 'ACOSA Tech Talks Registration',
    description: 'Register for ACOSA Tech Talks - AI & Machine Learning Panel featuring industry leaders',
    priceInCents: 0, // Free event (can be adjusted per event)
    images: [],
  },
  {
    id: 'networking-mixer-event',
    name: 'Networking Mixer Registration',
    description: 'Join us for Coffee & Conversations - Casual networking event with light refreshments',
    priceInCents: 0, // Free event
    images: [],
  },
  {
    id: 'career-workshop-event',
    name: 'Career Development Workshop Registration',
    description: 'Register for Interview Mastery Workshop - Learn proven techniques from top recruiters',
    priceInCents: 2999, // $29.99
    images: [],
  },
]
