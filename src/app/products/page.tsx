'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compare_price: number | null
  brand: string | null
  is_featured: boolean
  categories: { name: string; slug: string } | null
  product_images: { url: string; is_primary: boolean }[]
  product_variants: { name: string; type: string }[]
}

const categoryFilters = [
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
]

const categoryEmojis: Record<string, string> = {
  lipstick: '💄', foundation: '✨', skincare: '🧴',
  earrings: '💍', necklace: '📿', bracelet: '✨'
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCat, setSelectedCat] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<string[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, slug, description, price, compare_price, brand, is_featured,
        categories (name, slug),
        product_images (url, is_primary),
        product_variants (name, type)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  const addToCart = (id: string) => {
    setCart(prev => prev.includes(id) ? prev : [...prev, id])
  }

  let filtered = products.filter(p => {
    const matchCat = selectedCat === 'all' || p.categories?.slug === selectedCat
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  if (sortBy === 'price_asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortBy === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  const getImage = (p: Product) => {
    const primary = p.product_images?.find(i => i.is_primary)
    return primary?.url || p.product_images?.[0]?.url || null
  }

  const getShades = (p: Product) =>
    p.product_variants?.filter(v => v.type === 'shade') || []

  return (
    <div className="min-h-screen bg-white">
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
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categoryFilters.map(cat => (
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

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500">কোনো product পাওয়া যায়নি</p>
            <button onClick={() => { setSearch(''); setSelectedCat('all') }}
              className="mt-4 text-rose-500 text-sm hover:underline">সব দেখুন</button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => {
              const image = getImage(product)
              const shades = getShades(product)
              const catSlug = product.categories?.slug || ''
              const emoji = categoryEmojis[catSlug] || '✨'

              return (
                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
                  <div className="relative bg-gradient-to-br from-rose-50 to-pink-100 h-44 flex items-center justify-center">
                    {image ? (
                      <img src={image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">{emoji}</span>
                    )}
                    {product.compare_price && (
                      <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">Sale</span>
                    )}
                    {product.is_featured && !product.compare_price && (
                      <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">Featured</span>
                    )}
                    <button className="absolute top-2 right-2 text-gray-300 hover:text-rose-500 transition-colors">❤️</button>
                  </div>

                  <div className="p-3">
                    <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                    <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>

                    {shades.length > 0 && (
                      <div className="flex gap-1 mb-2 flex-wrap">
                        {shades.slice(0, 3).map((s, i) => (
                          <span key={i} className="text-xs bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full">{s.name}</span>
                        ))}
                        {shades.length > 3 && <span className="text-xs text-gray-400">+{shades.length - 3}</span>}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-gray-900">৳{product.price}</span>
                      {product.compare_price && (
                        <>
                          <span className="text-xs text-gray-400 line-through">৳{product.compare_price}</span>
                          <span className="text-xs text-rose-500 font-medium">
                            {Math.round((1 - product.price / product.compare_price) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product.id)}
                      className={`w-full text-sm py-2 rounded-full transition-colors ${
                        cart.includes(product.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-rose-500 text-white hover:bg-rose-600'
                      }`}
                    >
                      {cart.includes(product.id) ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

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
