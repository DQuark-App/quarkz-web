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
			hello: {
				Row: {
					id: number
					name: string
				}
				Insert: {
					id?: never
					name: string
				}
				Update: {
					id?: never
					name?: string
				}
			}
		}
	}
}
