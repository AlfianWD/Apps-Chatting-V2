<!-- Created By Alfian Wahyu -->

<template>
  <div class="tes">
    <div class="cards">
      <h3>Login</h3>
      <form @submit.prevent="loginUser">
        <div class="containerr-x mb-3">
          <input v-model="username" type="text" placeholder="Username" required />
        </div>
        <div class="containerr-x mb-3">
          <input v-model="password" type="Password" placeholder="Password" required />
          <div class="containerr-forgot">
            <p><a href="/forgot">Forgot Password ?</a></p>
          </div>
        </div>
        <div class="containerr-button">
          <button type="submit" :class="['btn btn-outline-danger']" :disabled="loading">
            Mulai
          </button>
        </div>
        <div class="containerr-a mb-3">
          <h6>
            Don't have account?
            <a href="/register">Create your account</a>
          </h6>
        </div>
      </form>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import { useRouter } from 'vue-router'

// Import useAuthStore from auth
import { useAuthStore } from '../assets/js/auth'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const username = ref('')
    const password = ref('')
    const loading = ref(false)

    const loginUser = async () => {
      try {
        loading.value = true
        const loginSuccess = await authStore.login({
          username: username.value,
          password: password.value
        })

        if (loginSuccess) {
          // Login successful
          alert('Login successful')

          // Menyimpan informasi sesi login ke localStorage
          localStorage.setItem('isLoggedIn', 'true')
          authStore.isAuthenticated = true

          // Redirect to the desired page after login
          router.push({ path: '/home' })
        } else {
          // Login failed
          alert('Login failed')
        }
      } catch (error) {
        console.error(error)
        alert('An error occurred during login')
      } finally {
        loading.value = false
      }
    }

    return {
      authStore,
      username,
      password,
      loading,
      loginUser
    }
  }
})
</script>

<style lang="scss">
.tes {
  min-height: 100vh;
  background-color: #0a0c0e;
}
.cards {
  background-color: white;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 450px;
  padding: 50px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  h3 {
    letter-spacing: 1px;
    font-family: 'Raleway', sans-serif;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 50px;
  }
}

.containerr-x {
  margin-left: 30px;
  margin-right: 30px;

  input {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    width: 100%;
    margin-bottom: 20px;
    color: #000000;
    border-bottom: 1px solid #000000;
  }

  .containerr-forgot {
    p {
      text-align: right;
      font-size: 14px;

      a {
        text-decoration: none;
      }
    }
  }
}

.containerr-a {
  margin-top: 25px;

  h6 {
    font-size: 15px;
    align-items: center;
    text-align: center;

    a {
      text-decoration: none;
    }
  }
}

.containerr-button {
  margin-left: 45px;
  margin-right: 45px;
  margin-bottom: 25px;

  button {
    width: 100%;
  }
}
</style>
