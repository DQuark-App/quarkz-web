import { NFTStorage } from 'nft.storage'

export default class Storage {
    private static _instance: NFTStorage

    private constructor() {}

    public static get instance(): NFTStorage {
        if (!Storage._instance) {
            Storage._instance = new NFTStorage({
                token: process.env.NFT_STORAGE_KEY || '',
            })
        }
        return this._instance
    }
}
