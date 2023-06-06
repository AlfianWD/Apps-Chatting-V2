import * as firebase from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDWumfZIAXT7pO5TabXCpmJ5swOAoxCuSM',
  authDomain: 'chats-app-v2.firebaseapp.com',
  projectId: 'chats-app-v2',
  storageBucket: 'chats-app-v2.appspot.com',
  messagingSenderId: '896139595881',
  appId: '1:896139595881:web:1ad6747b7caa47f04c92f8'
}

// Inisialisasi Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Export instance database
export const db = getDatabase(firebaseApp)
