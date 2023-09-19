'use client'

import { useDQuarkUser } from '@/providers/firebase'
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Protected({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true)
    const user = useDQuarkUser()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
        setLoading(false)
    }, [loading, router, user])
    if (loading || !user) {
        return <></>
    } else {
        return <>{children}</>
    }
}
