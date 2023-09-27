export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            folder: {
                Row: {
                    id: number
                    uid: string
                    name: string
                    user_id: string
                    created_at: Date
                    updated_at: Date
                }
                Insert: {
                    id?: never
                    uid: string
                    name: string
                    user_id: string
                    created_at: Date
                    updated_at: Date
                }
                Update: {
                    id?: never
                    name?: string
                    updated_at?: Date
                }
            }
            file: {
                Row: {
                    id: number
                    cid: string
                    user_id: string
                    album_uid: string
                    created_at: Date
                }
                Insert: {
                    id?: never
                    cid: string
                    user_id: string
                    album_uid: string
                    created_at: Date
                }
            }
            model: {
                Row: {
                    id: number
                    name: string
                    image: string
                    created_at: Date
                }
            }
        }
    }
}
