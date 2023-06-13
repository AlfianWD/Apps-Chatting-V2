<!-- Created By Alfian Wahyu -->

<template>
  <div class="tes">
    <div class="cards">
      <h3>Forgot Password</h3>
      <form @submit.prevent="forgotUser">
        <div class="containerr-x mb-3">
          <input v-model="username" type="text" placeholder="Username" />
        </div>
        <div class="containerr-button">
          <a type="button" href="/login" :class="['btn btn-outline-primary']">Back</a>
          <button type="submit" :class="['btn btn-outline-danger']" :disabled="loading">
            Cari
          </button>
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
  background-image: linear-gradient(to bottom right, rgb(245, 66, 101) 0%, rgb(189, 28, 60) 100%);
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
  display: flex;

  a {
    margin-right: 20px;
    width: 200px;
  }

  button {
    width: 100%;
  }
}
</style>
