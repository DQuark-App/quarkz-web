'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/store'

export default function Protected({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true)
    const store = useStore()
    const router = useRouter()

    useEffect(() => {
        if (store.user === null) {
            router.push('/login')
        }
        setLoading(false)
    }, [loading, router, store.user])
    if (loading || !store.user) {
        return <></>
    } else {
        return <>{children}</>
    }
}
