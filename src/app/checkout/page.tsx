'use client'

import { useState } from 'react'
import Link from 'next/link'

const orderItems = [
  { id: 1, name: 'Matte Velvet Lipstick', price: 350, emoji: '💄', qty: 1 },
  { id: 2, name: 'Rose Gold Hoop Earrings', price: 550, emoji: '💍', qty: 2 },
  { id: 3, name: 'Hydra Glow Serum', price: 720, emoji: '🧴', qty: 1 },
]

const districts = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna',
  'Barisal', 'Rangpur', 'Mymensingh', 'Comilla', 'Narayanganj',
  'Gazipur', 'Narsingdi', 'Tangail', 'Bogura', 'Jessore',
]

export default function CheckoutPage() {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: '', district: 'Dhaka', notes: ''
  })
  const [payment, setPayment] = useState<'bkash' | 'nagad' | 'cod'>('cod')
  const [orderNumber] = useState(`GS-${Date.now().toString().slice(-6)}`)

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= 999 ? 0 : 60
  const total = subtotal + shipping

  const handleAddress = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setStep('success')
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-rose-600">
            glam<span className="text-gray-800">store</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className={step === 'address' ? 'text-rose-500 font-medium' : 'text-green-500'}>
              {step !== 'address' ? '✓' : '1'} Address
            </span>
            <span className="text-gray-300">──</span>
            <span className={step === 'payment' ? 'text-rose-500 font-medium' : step === 'success' ? 'text-green-500' : ''}>
              {step === 'success' ? '✓' : '2'} Payment
            </span>
            <span className="text-gray-300">──</span>
            <span className={step === 'success' ? 'text-rose-500 font-medium' : ''}>3 Confirm</span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* SUCCESS */}
        {step === 'success' && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
            <div className="text-7xl mb-6">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-500 mb-2">আপনার order সফলভাবে place হয়েছে</p>
            <div className="inline-block bg-rose-50 text-rose-600 font-bold px-6 py-2 rounded-full text-lg mb-6">
              #{orderNumber}
            </div>
            <div className="max-w-sm mx-auto bg-gray-50 rounded-2xl p-4 mb-6 text-sm text-left space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Delivery address</span>
                <span className="font-medium text-gray-800">{form.name}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phone</span>
                <span className="font-medium text-gray-800">{form.phone}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Payment</span>
                <span className="font-medium text-gray-800 capitalize">{payment}</span>
              </div>
              <div className="flex justify-between text-gray-600 border-t border-gray-200 pt-2">
                <span>Total</span>
                <span className="font-bold text-rose-600">৳{total}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              📱 {form.phone} নম্বরে SMS পাঠানো হবে
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/" className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors">
                Home এ যান
              </Link>
              <Link href="/products" className="border border-rose-200 text-rose-500 px-8 py-3 rounded-full hover:bg-rose-50 transition-colors">
                আরো কিনুন
              </Link>
            </div>
          </div>
        )}

        {step !== 'success' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left: Form */}
            <div className="lg:col-span-2">

              {/* ADDRESS STEP */}
              {step === 'address' && (
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-5">📍 Delivery Address</h2>
                  <form onSubmit={handleAddress} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">পূর্ণ নাম *</label>
                        <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          placeholder="আপনার নাম"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone *</label>
                        <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                          placeholder="01XXXXXXXXX" type="tel"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">বাড়ি/রাস্তার ঠিকানা *</label>
                      <input required value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                        placeholder="বাড়ি নং, রাস্তা, এলাকা"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">শহর *</label>
                        <input required value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                          placeholder="যেমন: Mirpur, Dhanmondi"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">জেলা *</label>
                        <select value={form.district} onChange={e => setForm({...form, district: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300">
                          {districts.map(d => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">বিশেষ নির্দেশনা (optional)</label>
                      <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                        placeholder="যেমন: সন্ধ্যার পরে deliver করুন"
                        rows={2}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none" />
                    </div>
                    <button type="submit"
                      className="w-full bg-rose-500 text-white py-3.5 rounded-xl font-medium hover:bg-rose-600 transition-colors">
                      Payment এ যান →
                    </button>
                  </form>
                </div>
              )}

              {/* PAYMENT STEP */}
              {step === 'payment' && (
                <div className="bg-white rounded-2xl p-6">
                  <button onClick={() => setStep('address')} className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">
                    ← Address পরিবর্তন করুন
                  </button>

                  {/* Address summary */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-6 text-sm">
                    <p className="font-medium text-gray-800">{form.name} — {form.phone}</p>
                    <p className="text-gray-500">{form.address}, {form.city}, {form.district}</p>
                  </div>

                  <h2 className="text-lg font-bold text-gray-800 mb-5">💳 Payment Method</h2>

                  <div className="space-y-3 mb-6">
                    {[
                      { value: 'bkash', label: 'bKash', desc: 'bKash account থেকে pay করুন', color: 'text-pink-600', bg: 'bg-pink-50', emoji: '📱' },
                      { value: 'nagad', label: 'Nagad', desc: 'Nagad account থেকে pay করুন', color: 'text-orange-500', bg: 'bg-orange-50', emoji: '📱' },
                      { value: 'cod', label: 'Cash on Delivery', desc: 'Product পেলে টাকা দিন', color: 'text-gray-700', bg: 'bg-gray-50', emoji: '💵' },
                    ].map(m => (
                      <label key={m.value}
                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          payment === m.value ? 'border-rose-400 ' + m.bg : 'border-gray-100 hover:border-gray-200'
                        }`}>
                        <input type="radio" name="pay" value={m.value}
                          checked={payment === m.value}
                          onChange={() => setPayment(m.value as 'bkash' | 'nagad' | 'cod')}
                          className="accent-rose-500" />
                        <span className="text-2xl">{m.emoji}</span>
                        <div>
                          <p className={`font-medium ${m.color}`}>{m.label}</p>
                          <p className="text-xs text-gray-400">{m.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {(payment === 'bkash' || payment === 'nagad') && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
                      <p className="font-medium mb-1">📋 Payment Instructions:</p>
                      <p>1. {payment === 'bkash' ? 'bKash' : 'Nagad'} app খুলুন</p>
                      <p>2. Send Money করুন: <span className="font-bold">01XXXXXXXXX</span></p>
                      <p>3. Amount: <span className="font-bold">৳{total}</span></p>
                      <p>4. Reference: <span className="font-bold">{orderNumber}</span></p>
                    </div>
                  )}

                  <button onClick={handlePlaceOrder} disabled={loading}
                    className="w-full bg-rose-500 text-white py-3.5 rounded-xl font-medium hover:bg-rose-600 transition-colors disabled:opacity-70">
                    {loading ? '⏳ Processing...' : `Order Confirm করুন — ৳${total}`}
                  </button>
                </div>
              )}
            </div>

            {/* Right: Order summary */}
            <div>
              <div className="bg-white rounded-2xl p-4 sticky top-4">
                <h3 className="text-sm font-bold text-gray-700 mb-4">🛍 Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="bg-rose-50 w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">x{item.qty}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-800">৳{item.price * item.qty}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span><span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `৳${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-rose-600">৳{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
