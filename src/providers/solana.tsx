'use client'

import React, { FC, useMemo } from 'react'
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

import '@solana/wallet-adapter-react-ui/styles.css'
import '@/style/solana.css'

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
    const network = process.env
        .NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork
    const endpoint = useMemo(() => clusterApiUrl(network), [network])
    const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {/*<WalletDisconnectButton />*/}
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
