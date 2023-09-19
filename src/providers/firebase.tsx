'use client'

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyDxkv30TPyHp_pFAPaFQAp8dRX3sWabuFU',
    authDomain: 'dquark-e686c.firebaseapp.com',
    projectId: 'dquark-e686c',
    storageBucket: 'dquark-e686c.appspot.com',
    messagingSenderId: '842529856758',
    appId: '1:842529856758:web:ed4e5424731d39e2e4a0d7',
}
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

type DQuarkUser = User | null

const FirebaseAuthContext = createContext<DQuarkUser>(null)

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<DQuarkUser>(null)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user: User | null) => {
            setUser(user)
        })
    }, [])
    return (
        <FirebaseAuthContext.Provider value={user}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}

export const useDQuarkUser = () => {
    return useContext(FirebaseAuthContext)
}
