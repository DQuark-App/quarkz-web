import { App, initializeApp } from 'firebase-admin/app'
import { Auth, getAuth } from 'firebase-admin/auth'
import { credential } from 'firebase-admin'

const adminCred = credential.cert(
    JSON.parse(process.env.FIREBASE_CREDENTIALS || '')
)

class FirebaseService {
    private static _firebaseAdmin: App
    private static _firebaseAdminAuth: Auth

    public static get firebaseAdmin(): App {
        if (!this._firebaseAdmin) {
            this._firebaseAdmin = initializeApp(
                {
                    credential: adminCred,
                    databaseURL: process.env.FIREBASE_DATABASE_URL,
                },
                new Date().getTime().toString()
            )
        }
        return this._firebaseAdmin
    }

    public static get firebaseAdminAuth(): Auth {
        if (!this._firebaseAdminAuth) {
            this._firebaseAdminAuth = getAuth(this.firebaseAdmin)
        }
        return this._firebaseAdminAuth
    }
}

export default FirebaseService
