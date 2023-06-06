<!-- Created By Alfian Wahyu -->

<template>
  <div class="test">
    <div class="card">
      <h3>Register</h3>
      <form class="form-login" @submit.prevent="registerUser">
        <div class="containerr-y mb-3">
          <input v-model="username" type="text" placeholder="Username" />
        </div>
        <div class="containerr-y mb-3">
          <input v-model="email" type="email" placeholder="Email" />
        </div>
        <div class="containerr-y mb-3">
          <input v-model="password" type="Password" placeholder="Password" />
        </div>
        <div class="containerr-y mb-3">
          <input v-model="confirmPassword" type="Password" placeholder="Re-Password" />
        </div>
        <div class="containerr-buttonn">
          <button type="submit" :class="['btn btn-outline-danger']">Create</button>
        </div>
        <div class="containerr-b mb-3">
          <h6>
            Have account?
            <a href="/login">Login</a>
          </h6>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref as dbRef, push, set } from 'firebase/database'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },

  methods: {
    async registerUser() {
      // Mengecek apakah password dan konfirmasi password sama
      if (this.password !== this.confirmPassword) {
        alert('Password tidak sama')
        return
      }

      // Inisialisasi database
      const db = getDatabase()
      const usersRef = dbRef(db, 'users')

      // Menambahkan data user ke dalam database
      await push(usersRef, {
        username: this.username,
        email: this.email,
        password: this.password
      })

      // Reset input field setelah mensubmit
      this.username = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''

      alert('Registration successful')
    }
  }
}
</script>

<style lang="scss">
.test {
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, rgb(245, 66, 101) 0%, rgb(189, 28, 60) 100%);
}
.card {
  position: fixed;
  transform: translate(-50%, 10%);
  left: 50%;
  top: 50%;
  width: 450px;
  padding: 40px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  border-radius: 35px;

  h3 {
    letter-spacing: 1px;
    font-family: 'Raleway', sans-serif;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 50px;
  }
}

.containerr-y {
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
}

.containerr-b {
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

.containerr-buttonn {
  margin-left: 45px;
  margin-right: 45px;
  margin-bottom: 25px;

  button {
    width: 100%;
  }
}
</style>
