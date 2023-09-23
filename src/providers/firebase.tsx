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
import useStore from '@/store'

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

type DQuarkUser = User | null | undefined

const FirebaseAuthContext = createContext<DQuarkUser>(undefined)

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
    const store = useStore()

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user: User | null) => {
            store.setUser(user)
        })
    }, [])
    return (
        <FirebaseAuthContext.Provider value={store.user}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}
