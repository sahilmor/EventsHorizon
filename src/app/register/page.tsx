'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2 } from 'lucide-react' // Spinner icon

export default function Register() {
    const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        const { fullName, email, password, confirmPassword } = form

        if (password !== confirmPassword) {
            setError("Passwords don't match")
            setLoading(false)
            return
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { fullName, role: 'user' },
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })

        setLoading(false)

        if (error) setError(error.message)
        else setSuccess('Check your email to verify your account!')
    }

    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <Card className='w-96 bg-black border-none text-white'>
                <CardHeader>
                    <CardTitle className='text-2xl font-bold'>Register</CardTitle>
                    <CardDescription>Create an account to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Label className='mt-4'>Full Name</Label>
                        <Input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} required className='bg-black border-1 border-white/50 text-white mt-2' />
                        <Label className='mt-4'>Email</Label>
                        <Input name="email" type="email" placeholder="Email" onChange={handleChange} required className='bg-black border-1 border-white/50 text-white mt-2' />
                        <Label className='mt-4'>Password</Label>
                        <Input name="password" type="password" placeholder="Password" onChange={handleChange} required className='bg-black border-1 border-white/50 text-white mt-2' />
                        <Label className='mt-4'>Confirm Password</Label>
                        <Input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required className='bg-black border-1 border-white/50 text-white mt-2' />

                        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-sm text-green-500 mt-2">{success}</p>}

                        <Button
                            type="submit"
                            disabled={loading}
                            className='bg-red-500 text-white mt-4 hover:bg-red-600 w-full cursor-pointer flex items-center justify-center'
                        >
                            {loading ? <Loader2 className='animate-spin w-4 h-4 mr-2' /> : null}
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className='w-full text-sm text-white/50 text-center'>
                        Already have an account?{' '}
                        <Link href="/login" className='text-red-500 hover:text-red-600 hover:underline'>Login</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
