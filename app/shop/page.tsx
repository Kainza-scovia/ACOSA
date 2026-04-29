'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

function ShopContent() {
  const products = [
    {
      id: 1,
      name: 'ACOSA T-Shirt (Blue)',
      price: '$25.00',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      stock: 'In Stock',
    },
    {
      id: 2,
      name: 'ACOSA Cap',
      price: '$20.00',
      image: 'https://images.unsplash.com/photo-1588368541386-7bb40d60b5b7?w=300&h=300&fit=crop',
      stock: 'In Stock',
    },
    {
      id: 3,
      name: 'ACOSA Hoodie',
      price: '$50.00',
      image: 'https://images.unsplash.com/photo-1556821552-107fcaeb26d0?w=300&h=300&fit=crop',
      stock: 'In Stock',
    },
    {
      id: 4,
      name: 'ACOSA Polo Shirt',
      price: '$35.00',
      image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=300&h=300&fit=crop',
      stock: 'In Stock',
    },
    {
      id: 5,
      name: 'ACOSA Coffee Mug',
      price: '$12.00',
      image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=300&h=300&fit=crop',
      stock: 'In Stock',
    },
    {
      id: 6,
      name: 'ACOSA Backpack',
      price: '$60.00',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      stock: 'Limited Stock',
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">ACOSA Shop</h1>
            <p className="text-muted-foreground mb-8">Show your pride with ACOSA branded merchandise.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock === 'In Stock'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      <RightSidebar />
    </div>
  );
}

export default function ShopPage() {
  return (
    <ProtectedRoute>
      <ShopContent />
    </ProtectedRoute>
  );
}
