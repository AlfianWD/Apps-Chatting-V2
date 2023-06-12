import * as firebase from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC_-6eXs4rF6Nb4O-AbAKIgHJDZMGQrU6k',
  authDomain: 'chats-apps-v2.firebaseapp.com',
  projectId: 'chats-apps-v2',
  storageBucket: 'chats-apps-v2.appspot.com',
  messagingSenderId: '733484297151',
  appId: '1:733484297151:web:389a779e72764f82bb8f0a'
}

// Inisialisasi Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Export instance database
const db = getDatabase(firebaseApp)

// Export instance Auth
const auth = getAuth(firebaseApp)

export { db, auth }
