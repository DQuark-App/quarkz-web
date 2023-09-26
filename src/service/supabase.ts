import { Database } from '@/schema/database.types'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

class SupaBaseService {
    private static _instance: SupabaseClient<Database>
    private constructor() {}

    public static get instance(): SupabaseClient<Database> {
        if (!this._instance) {
            SupaBaseService._instance = createClient<Database>(
                process.env.SUPABASE_URL || '',
                process.env.SUPABASE_KEY || '',
                {
                    auth: {
                        autoRefreshToken: false,
                        persistSession: false,
                    },
                }
            )
        }
        return this._instance
    }
}

export default SupaBaseService
