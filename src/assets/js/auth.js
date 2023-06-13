import { createPinia, defineStore } from 'pinia'
import { ref, get, orderByChild, equalTo, query } from 'firebase/database'

const pinia = createPinia()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),

  actions: {
    async login({ username, password }) {
      try {
        const userRef = ref(db, 'users')
        const queryRef = query(userRef, orderByChild('username'), equalTo(username))
        const snapshot = await get(queryRef)

        if (snapshot.exists()) {
          const userData = snapshot.val()
          const userKey = Object.keys(userData)[0]
          const user = userData[userKey]

          if (user.password === password) {
            // Login Berhasil
            this.isAuthenticated = true
            this.user = { username }
            return true
          }
        }

        // Login Gagal
        return false
      } catch (error) {
        console.error(error)
        throw new Error('An error occurred during login')
      }
    }
  }
})

export default pinia
