<template>
  <div class="Home">
    <h1>Selamat Datang di Halaman Home</h1>
    <p>Ini adalah halaman yang hanya dapat diakses setelah login.</p>
    <p>Konten lainnya...</p>
  </div>
</template>

<script>
// Import useAuthStore from auth
import { useAuthStore } from '../assets/js/auth'

export default {
  name: 'Home',
  beforeRouteEnter(to, from, next) {
    const authStore = useAuthStore() // Menggunakan store auth

    // Mengecek status autentikasi pengguna sebelum memasuki halaman
    if (!authStore.isAuthenticated) {
      // Jika belum login, redirect ke halaman login
      next('/login')
    } else {
      // Jika sudah login, izinkan akses ke halaman Home
      next()
    }
  }
}
</script>

<style scoped>
.Home {
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
}
</style>
