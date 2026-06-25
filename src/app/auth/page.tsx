'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register form state
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })
    if (error) {
      setMessage({ type: 'error', text: 'Email বা password ভুল হয়েছে!' })
    } else {
      setMessage({ type: 'success', text: 'Login সফল! Redirect হচ্ছে...' })
      setTimeout(() => { window.location.href = '/' }, 1500)
    }
    setLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (regPassword !== regConfirm) {
      setMessage({ type: 'error', text: 'Password দুটো মিলছে না!' })
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
      options: { data: { full_name: regName, phone: regPhone } }
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else if (data.user) {
      // Create profile
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: regName,
        phone: regPhone,
      })
      setMessage({ type: 'success', text: 'Account তৈরি হয়েছে! Email verify করুন।' })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center px-4">

      {/* Back to home */}
      <Link href="/" className="absolute top-6 left-6 text-gray-500 hover:text-rose-500 flex items-center gap-2 text-sm">
        ← glamstore
      </Link>

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-rose-600">
            glam<span className="text-gray-800">store</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">Makeup & accessories for every woman</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => { setTab('login'); setMessage(null) }}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                tab === 'login'
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-50 text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setTab('register'); setMessage(null) }}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                tab === 'register'
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-50 text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-6">

            {/* Message */}
            {message && (
              <div className={`mb-4 px-4 py-3 rounded-xl text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.type === 'success' ? '✅' : '❌'} {message.text}
              </div>
            )}

            {/* LOGIN FORM */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-rose-500 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-500 text-white py-3 rounded-xl font-medium hover:bg-rose-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Login →'}
                </button>
              </form>
            )}

            {/* REGISTER FORM */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">পূর্ণ নাম</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="আপনার নাম"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone (bKash/Nagad)</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="কমপক্ষে ৬ অক্ষর"
                    minLength={6}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={regConfirm}
                    onChange={e => setRegConfirm(e.target.value)}
                    placeholder="আবার লিখুন"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-500 text-white py-3 rounded-xl font-medium hover:bg-rose-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Account তৈরি করুন →'}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">অথবা</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Guest checkout */}
            <Link
              href="/products"
              className="block w-full text-center border border-gray-200 text-gray-600 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              Guest হিসেবে shop করুন →
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Account তৈরি করলে আমাদের{' '}
          <span className="text-rose-400">Terms & Privacy Policy</span>
          {' '}মেনে নেওয়া হবে।
        </p>
      </div>
    </div>
  )
}
