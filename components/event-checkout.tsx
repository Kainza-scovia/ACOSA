'use client'

import { useCallback, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { startCheckoutSession } from '@/app/actions/stripe'
import { X } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface EventCheckoutProps {
  eventTitle: string
  productId: string
  onClose: () => void
}

export function EventCheckout({ eventTitle, productId, onClose }: EventCheckoutProps) {
  const [isLoading, setIsLoading] = useState(true)

  const startCheckoutSessionForProduct = useCallback(async () => {
    setIsLoading(true)
    try {
      const clientSecret = await startCheckoutSession(productId)
      setIsLoading(false)
      return clientSecret
    } catch (error) {
      console.error('Error starting checkout:', error)
      setIsLoading(false)
      throw error
    }
  }, [productId])

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Event Registration</h2>
            <p className="text-muted-foreground text-sm mt-1">{eventTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Checkout Form */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading payment options...</p>
              </div>
            </div>
          ) : (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret: startCheckoutSessionForProduct }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>

        {/* Payment Methods Info */}
        <div className="bg-secondary/30 border-t border-border p-6">
          <h3 className="font-semibold text-foreground mb-3">Payment Methods Accepted</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">💳</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Bank Transfer</p>
                <p className="text-sm text-muted-foreground">Direct bank account payment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">📱</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Mobile Money</p>
                <p className="text-sm text-muted-foreground">Pay via mobile wallet</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">🔒</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Secure Payment</p>
                <p className="text-sm text-muted-foreground">Powered by Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
