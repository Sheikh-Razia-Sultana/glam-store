import Link from 'next/link'

const featured = [
  { id: 1, name: 'Matte Velvet Lipstick', price: 350, compare: 450, badge: 'Best Seller', emoji: '💄', shades: ['#C0392B','#8E1A0E','#E8937A','#D4608A'] },
  { id: 2, name: 'Dewy Glow Foundation', price: 890, compare: 1100, badge: 'New', emoji: '✨', shades: ['#F5CBA7','#E8B88A','#D4956A','#B07D55'] },
  { id: 3, name: 'Rose Gold Hoop Earrings', price: 550, compare: null, badge: 'Trending', emoji: '💍', shades: [] },
  { id: 4, name: 'Hydra Glow Serum', price: 720, compare: 900, badge: 'Sale', emoji: '🧴', shades: [] },
]

const categories = [
  { name: 'Lipstick', emoji: '💄', slug: 'lipstick', color: 'bg-rose-50' },
  { name: 'Foundation', emoji: '✨', slug: 'foundation', color: 'bg-amber-50' },
  { name: 'Skincare', emoji: '🧴', slug: 'skincare', color: 'bg-green-50' },
  { name: 'Earrings', emoji: '💍', slug: 'earrings', color: 'bg-purple-50' },
  { name: 'Necklace', emoji: '📿', slug: 'necklace', color: 'bg-pink-50' },
  { name: 'Bracelet', emoji: '✨', slug: 'bracelet', color: 'bg-yellow-50' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-rose-600">
            glam<span className="text-gray-800">store</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/products" className="hover:text-rose-500 transition-colors">Products</Link>
            <Link href="/products?cat=makeup" className="hover:text-rose-500 transition-colors">Makeup</Link>
            <Link href="/products?cat=accessories" className="hover:text-rose-500 transition-colors">Accessories</Link>
            <Link href="/products?sale=true" className="text-rose-500 font-medium">Sale 🔥</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/products" className="text-gray-500 hover:text-gray-800 text-xl">🔍</Link>
            <Link href="/cart" className="relative text-gray-500 hover:text-gray-800 text-xl">
              🛒
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </Link>
            <Link href="/auth" className="bg-rose-500 text-white text-sm px-4 py-2 rounded-full hover:bg-rose-600 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-rose-100 text-rose-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            🇧🇩 Fast delivery across Bangladesh
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Feel Beautiful,<br />
            <span className="text-rose-500">Every Day</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
            Premium makeup & accessories — delivered to your door. Pay with bKash, Nagad, or Cash on Delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products" className="bg-rose-500 text-white px-8 py-3.5 rounded-full font-medium hover:bg-rose-600 transition-colors">
              Shop Now →
            </Link>
            <Link href="/products?sale=true" className="bg-white text-rose-500 border border-rose-200 px-8 py-3.5 rounded-full font-medium hover:bg-rose-50 transition-colors">
              View Sale 🔥
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-400">
            <span>✅ Free delivery over ৳999</span>
            <span>✅ 7-day return</span>
            <span>✅ 100% authentic</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/products?cat=${cat.slug}`}
              className={`${cat.color} rounded-2xl p-4 text-center hover:scale-105 transition-transform cursor-pointer`}>
              <div className="text-3xl mb-2">{cat.emoji}</div>
              <div className="text-xs font-medium text-gray-700">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link href="/products" className="text-rose-500 text-sm hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((product) => (
            <div key={product.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-br from-rose-50 to-pink-100 h-48 flex items-center justify-center text-5xl relative">
                {product.emoji}
                <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">{product.badge}</span>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-rose-500 transition-colors">❤️</button>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                {product.shades.length > 0 && (
                  <div className="flex gap-1 mb-2">
                    {product.shades.map((color) => (
                      <div key={color} className="w-4 h-4 rounded-full border border-white shadow-sm cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-gray-900">৳{product.price}</span>
                  {product.compare && <span className="text-xs text-gray-400 line-through">৳{product.compare}</span>}
                  {product.compare && <span className="text-xs text-rose-500 font-medium">{Math.round((1 - product.price / product.compare) * 100)}% off</span>}
                </div>
                <button className="w-full bg-rose-500 text-white text-sm py-2 rounded-full hover:bg-rose-600 transition-colors">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">We accept</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm text-sm font-medium text-pink-600">📱 bKash</div>
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm text-sm font-medium text-orange-500">📱 Nagad</div>
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm text-sm font-medium text-gray-700">💵 Cash on Delivery</div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 px-4 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="text-white font-bold text-lg mb-3">glamstore</div>
            <p className="text-xs leading-relaxed">Premium makeup & accessories for every Bangladeshi woman.</p>
          </div>
          <div>
            <div className="text-white font-medium mb-3">Shop</div>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-white">All Products</Link></li>
              <li><Link href="/products?cat=makeup" className="hover:text-white">Makeup</Link></li>
              <li><Link href="/products?cat=accessories" className="hover:text-white">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-medium mb-3">Help</div>
            <ul className="space-y-2">
              <li><Link href="/track" className="hover:text-white">Track Order</Link></li>
              <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-medium mb-3">Contact</div>
            <p className="text-xs">📱 01XXXXXXXXX</p>
            <p className="text-xs mt-1">📧 hello@glamstore.com</p>
            <p className="text-xs mt-1">🕐 Sat–Thu, 9am–8pm</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-8 pt-4 text-xs text-center">
          © 2025 Glam Store. Made with ❤️ in Bangladesh.
        </div>
      </footer>
    </main>
  )
}