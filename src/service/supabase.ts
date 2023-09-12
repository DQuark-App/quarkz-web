import { Database } from '@/schema/database.types'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

class SupaBaseService {
	private static _instance: SupabaseClient<Database>
	constructor() {
		if (!SupaBaseService._instance) {
			SupaBaseService._instance = createClient<Database>(
				process.env.SUPABASE_URL || '',
				process.env.SUPABASE_KEY || ''
			)
		}
		return SupaBaseService._instance
	}

	public static get instance(): SupabaseClient<Database> {
		if (!this._instance) {
			SupaBaseService._instance = createClient<Database>(
				process.env.SUPABASE_URL || '',
				process.env.SUPABASE_KEY || ''
			)
		}
		return this._instance
	}
}

export default SupaBaseService
