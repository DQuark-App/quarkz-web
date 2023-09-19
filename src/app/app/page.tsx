'use client'

import Container from '@/components/container'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'
import { firebaseAuth, useDQuarkUser } from '@/providers/firebase'

export default function UserHome() {
    const router = useRouter()
    const user = useDQuarkUser()
    const signOut = () => {
        firebaseAuth.signOut()
        router.push('/login')
    }
    return (
        <Container>
            <h1>Welcome {user?.email}</h1>
            <Button onClick={signOut}>SIGN OUT</Button>
        </Container>
    )
}
