'use client'

import { useState } from 'react'
import Link from 'next/link'

const initialCart = [
  { id: 1, name: 'Matte Velvet Lipstick', price: 350, emoji: '💄', brand: 'GlamX', variant: 'Shade: Red', qty: 1 },
  { id: 2, name: 'Rose Gold Hoop Earrings', price: 550, emoji: '💍', brand: 'GlamStore', variant: null, qty: 2 },
  { id: 3, name: 'Hydra Glow Serum', price: 720, emoji: '🧴', brand: 'GlowLab', variant: null, qty: 1 },
]

const SHIPPING_FEE = 60
const FREE_SHIPPING_THRESHOLD = 999

export default function CartPage() {
  const [items, setItems] = useState(initialCart)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'cod'>('cod')

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal - discount + shipping

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'GLAM10') {
      setCouponApplied(true)
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code!')
      setCouponApplied(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-rose-600">
            glam<span className="text-gray-800">store</span>
          </Link>
          <Link href="/products" className="text-sm text-gray-500 hover:text-rose-500">
            ← Shopping চালিয়ে যান
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🛒 আমার Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Cart খালি আছে!</h2>
            <p className="text-gray-400 mb-6">আপনার পছন্দের products add করুন</p>
            <Link href="/products" className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors">
              Products দেখুন →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4">
                  {/* Product image */}
                  <div className="bg-gradient-to-br from-rose-50 to-pink-100 w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {item.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{item.brand}</p>
                    <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                    {item.variant && <p className="text-xs text-gray-400 mt-0.5">{item.variant}</p>}
                    <p className="text-rose-600 font-bold mt-1">৳{item.price}</p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-rose-300 hover:text-rose-500 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-rose-300 hover:text-rose-500 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Item total */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900">৳{item.price * item.qty}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Free shipping progress */}
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <div className="bg-white rounded-2xl p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    আরো <span className="font-bold text-rose-500">৳{FREE_SHIPPING_THRESHOLD - subtotal}</span> কিনলে Free Delivery পাবেন! 🚚
                  </p>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-400 rounded-full transition-all"
                      style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {subtotal >= FREE_SHIPPING_THRESHOLD && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-3 text-sm text-green-700 text-center">
                  🎉 Free Delivery পেয়েছেন!
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="space-y-4">

              {/* Coupon */}
              <div className="bg-white rounded-2xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">🎟 Coupon Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponError('') }}
                    placeholder="GLAM10"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-rose-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-rose-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && <p className="text-xs text-green-600 mt-2">✅ GLAM10 applied — 10% off!</p>}
                {couponError && <p className="text-xs text-red-500 mt-2">❌ {couponError}</p>}
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">💳 Payment Method</h3>
                <div className="space-y-2">
                  {[
                    { value: 'bkash', label: '📱 bKash', color: 'text-pink-600' },
                    { value: 'nagad', label: '📱 Nagad', color: 'text-orange-500' },
                    { value: 'cod', label: '💵 Cash on Delivery', color: 'text-gray-700' },
                  ].map(method => (
                    <label key={method.value} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:border-rose-200 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value as 'bkash' | 'nagad' | 'cod')}
                        className="accent-rose-500"
                      />
                      <span className={`text-sm font-medium ${method.color}`}>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price breakdown */}
              <div className="bg-white rounded-2xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                    <span>৳{subtotal}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (GLAM10)</span>
                      <span>−৳{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `৳${shipping}`}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-rose-600">৳{total}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-4 block w-full bg-rose-500 text-white text-center py-3.5 rounded-xl font-medium hover:bg-rose-600 transition-colors"
                >
                  Checkout করুন →
                </Link>

                <p className="text-xs text-gray-400 text-center mt-3">
                  🔒 Secure checkout — আপনার তথ্য সুরক্ষিত
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
