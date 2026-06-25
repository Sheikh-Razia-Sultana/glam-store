'use client'

import { useState } from 'react'
import Link from 'next/link'

const allProducts = [
  { id: 1, name: 'Matte Velvet Lipstick', price: 350, compare: 450, category: 'lipstick', brand: 'GlamX', badge: 'Best Seller', emoji: '💄', rating: 4.8, reviews: 124, shades: ['#C0392B', '#8E1A0E', '#E8937A', '#D4608A'], inStock: true },
  { id: 2, name: 'Dewy Glow Foundation', price: 890, compare: 1100, category: 'foundation', brand: 'LuxeBeauty', badge: 'New', emoji: '✨', rating: 4.6, reviews: 89, shades: ['#F5CBA7', '#E8B88A', '#D4956A', '#B07D55'], inStock: true },
  { id: 3, name: 'Rose Gold Hoop Earrings', price: 550, compare: null, category: 'earrings', brand: 'GlamStore', badge: 'Trending', emoji: '💍', rating: 4.9, reviews: 203, shades: [], inStock: true },
  { id: 4, name: 'Hydra Glow Serum', price: 720, compare: 900, category: 'skincare', brand: 'GlowLab', badge: 'Sale', emoji: '🧴', rating: 4.7, reviews: 67, shades: [], inStock: true },
  { id: 5, name: 'Nude Lip Gloss Set', price: 280, compare: 350, category: 'lipstick', brand: 'GlamX', badge: 'Sale', emoji: '💋', rating: 4.5, reviews: 45, shades: ['#F4A7A3', '#E8937A', '#D4608A'], inStock: true },
  { id: 6, name: 'Pearl Necklace Set', price: 850, compare: null, category: 'necklace', brand: 'GlamStore', badge: 'New', emoji: '📿', rating: 4.8, reviews: 38, shades: [], inStock: true },
  { id: 7, name: 'CC Cream SPF 30', price: 650, compare: 800, category: 'foundation', brand: 'LuxeBeauty', badge: null, emoji: '🌟', rating: 4.4, reviews: 92, shades: ['#F5CBA7', '#E8B88A', '#D4956A'], inStock: false },
  { id: 8, name: 'Crystal Bracelet', price: 420, compare: null, category: 'bracelet', brand: 'GlamStore', badge: 'Trending', emoji: '✨', rating: 4.6, reviews: 156, shades: [], inStock: true },
  { id: 9, name: 'Vitamin C Face Wash', price: 320, compare: 400, category: 'skincare', brand: 'GlowLab', badge: null, emoji: '🍋', rating: 4.3, reviews: 78, shades: [], inStock: true },
  { id: 10, name: 'Smoky Eye Palette', price: 780, compare: 950, category: 'foundation', brand: 'GlamX', badge: 'Best Seller', emoji: '👁', rating: 4.9, reviews: 312, shades: [], inStock: true },
  { id: 11, name: 'Gold Drop Earrings', price: 380, compare: null, category: 'earrings', brand: 'GlamStore', badge: null, emoji: '🌙', rating: 4.7, reviews: 94, shades: [], inStock: true },
  { id: 12, name: 'Retinol Night Cream', price: 960, compare: 1200, category: 'skincare', brand: 'GlowLab', badge: 'New', emoji: '🌙', rating: 4.8, reviews: 41, shades: [], inStock: true },
]

const categories = [
  { label: 'সব', value: 'all' },
  { label: '💄 Lipstick', value: 'lipstick' },
  { label: '✨ Foundation', value: 'foundation' },
  { label: '🧴 Skincare', value: 'skincare' },
  { label: '💍 Earrings', value: 'earrings' },
  { label: '📿 Necklace', value: 'necklace' },
  { label: '✨ Bracelet', value: 'bracelet' },
]

const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
]

export default function ProductsPage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<number[]>([])

  const addToCart = (id: number) => {
    setCart(prev => [...prev, id])
  }

  let filtered = allProducts.filter(p => {
    const matchCat = selectedCat === 'all' || p.category === selectedCat
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  if (sortBy === 'price_asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortBy === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  if (sortBy === 'reviews') filtered = [...filtered].sort((a, b) => b.reviews - a.reviews)

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-rose-600">
            glam<span className="text-gray-800">store</span>
          </Link>
          <div className="flex-1 max-w-sm mx-6">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative text-gray-500 hover:text-gray-800 text-xl">
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link href="/auth" className="bg-rose-500 text-white text-sm px-4 py-2 rounded-full hover:bg-rose-600 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">সব Products</h1>
            <p className="text-sm text-gray-400 mt-1">{filtered.length} টি product পাওয়া গেছে</p>
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCat(cat.value)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCat === cat.value
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500">কোনো product পাওয়া যায়নি</p>
            <button onClick={() => { setSearch(''); setSelectedCat('all') }} className="mt-4 text-rose-500 text-sm hover:underline">
              সব দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all group">

                {/* Image */}
                <div className="relative bg-gradient-to-br from-rose-50 to-pink-100 h-44 flex items-center justify-center text-5xl">
                  {product.emoji}
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">Stock নেই</span>
                    </div>
                  )}
                  <button className="absolute top-2 right-2 text-gray-300 hover:text-rose-500 transition-colors">❤️</button>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                  <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>

                  {/* Shades */}
                  {product.shades.length > 0 && (
                    <div className="flex gap-1 mb-2">
                      {product.shades.map(color => (
                        <div key={color} className="w-3.5 h-3.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-gray-900">৳{product.price}</span>
                    {product.compare && (
                      <>
                        <span className="text-xs text-gray-400 line-through">৳{product.compare}</span>
                        <span className="text-xs text-rose-500 font-medium">
                          {Math.round((1 - product.price / product.compare) * 100)}% off
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => product.inStock && addToCart(product.id)}
                    disabled={!product.inStock}
                    className={`w-full text-sm py-2 rounded-full transition-colors ${
                      product.inStock
                        ? cart.includes(product.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-rose-500 text-white hover:bg-rose-600'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {!product.inStock ? 'Stock নেই' : cart.includes(product.id) ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart floating button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Link href="/cart" className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors">
            <span>🛒</span>
            <span className="text-sm font-medium">{cart.length} item — Cart দেখুন</span>
            <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">→</span>
          </Link>
        </div>
      )}
    </div>
  )
}
