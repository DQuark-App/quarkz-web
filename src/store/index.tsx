import { create } from 'zustand'
import { devtools, persist, StateStorage } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'
import { User } from 'firebase/auth'
import { firebaseAuth } from '@/providers/firebase'
import { del, get, set } from 'idb-keyval'

const storage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        return (await get(name)) || null
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await set(name, value)
    },
    removeItem: async (name: string): Promise<void> => {
        await del(name)
    },
}

interface AppState {
    user: User | null
    isWallet: boolean
    isDarkMode: boolean
    isNotificationEnabled: boolean
    isNewNotification: boolean
    walletToken: string | null
    walletPubKey: string | null
    setDarkMode: (isDarkMode: boolean) => void
    setPushNotification: (isNotificationEnabled: boolean) => void
    setUser: (user: User | null) => void
    signOut: () => void
    setWalletToken: (token: string | null, pubKey: string | null) => void
}

const useStore = create<AppState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isWallet: false,
                isDarkMode: false,
                isNotificationEnabled: false,
                isNewNotification: false,
                walletToken: null,
                walletPubKey: null,
                setPushNotification: (isNotificationEnabled) =>
                    set((state) => ({ ...state, isNotificationEnabled })),
                setDarkMode: (isDarkMode) =>
                    set((state) => ({ ...state, isDarkMode })),
                setWalletToken: (newToken, walletPubKey) =>
                    set((state) => ({
                        ...state,
                        walletToken: newToken,
                        isWallet: newToken !== null,
                        walletPubKey,
                    })),
                setUser: (newUser) =>
                    set((state) => ({ ...state, user: newUser })),
                signOut: () => {
                    set((state) => ({
                        ...state,
                        user: null,
                        isWallet: false,
                        walletToken: null,
                        walletPubKey: null,
                    }))
                    firebaseAuth.signOut()
                },
            }),
            {
                name: 'appStore',
                storage: createJSONStorage(() => storage),
                partialize: (state) => {
                    const { user, ...rest } = state
                    return rest
                },
            }
        )
    )
)

export default useStore
