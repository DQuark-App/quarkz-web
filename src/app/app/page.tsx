'use client'

import Container from '@/components/container'
import { useRouter } from 'next/navigation'

export default function UserHome() {
    const router = useRouter()
    const signOut = () => {
        router.push('/login')
    }
    return (
        <>
            <h1>Home</h1>
        </>
    )
}
