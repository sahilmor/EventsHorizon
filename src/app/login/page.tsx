'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const { email, password } = form
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (!data.session?.user?.email_confirmed_at) {
      setError("Please verify your email before logging in.")
      setLoading(false)
      return
    }

    router.push('/events')
  }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Card className='w-96 bg-black border-none text-white'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Login</CardTitle>
          <CardDescription>Login to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label className='mt-2'>Email</Label>
            <Input name="email" type="email" placeholder="Email" onChange={handleChange} required className='bg-black border-1 border-white/50 text-white mt-2' />
            <Label className='mt-2'>Password</Label>
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} required className='bg-black border-1 border-white/50 text-white mt-2' />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            <Button type="submit" disabled={loading} className='bg-red-500 text-white mt-4 hover:bg-red-600 w-full'>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className='w-full text-sm text-white/50 text-center'>Don't have an account? <Link href="/signup" className='text-red-500 hover:text-red-600 hover:underline'>Sign up</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}
