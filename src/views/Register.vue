<!-- Created By Alfian Wahyu -->

<template>
  <div class="test">
    <div class="card">
      <h3>Register</h3>
      <form class="form-login" @submit.prevent="registerUser">
        <div class="containerr-y mb-3">
          <input v-model="name" type="text" placeholder="Name" required />
        </div>
        <div class="containerr-y mb-3">
          <input v-model="username" type="text" placeholder="Username" required />
        </div>
        <div class="containerr-y mb-3">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            required
          />
          <a class="buttonn-show" @click.prevent="showPassword = !showPassword">
            <font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" />
          </a>
        </div>
        <div class="containerr-y mb-3">
          <input
            v-model="confirmPassword"
            :type="showwPassword ? 'text' : 'password'"
            placeholder="Re-Password"
            required
          />
          <a class="buttonn-showw" @click.prevent="showwPassword = !showwPassword">
            <font-awesome-icon :icon="['fas', showwPassword ? 'eye-slash' : 'eye']" />
          </a>
        </div>
        <div class="containerr-buttonn">
          <button type="submit" :class="['btn btn-outline-danger']" :disabled="isRegistering">
            {{ isRegistering ? 'Creating...' : 'Create' }}
          </button>
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
import { getDatabase, ref as dbRef, push } from 'firebase/database'

export default {
  data() {
    return {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      isRegistering: false,
      showPassword: false,
      showwPassword: false
    }
  },

  methods: {
    async registerUser() {
      // Mengecek apakah password dan konfirmasi password sama
      if (this.password !== this.confirmPassword) {
        alert('Password tidak sama')
        return
      }

      // Mengecek apakah ada input form yang kosong
      if (!this.name || !this.username || !this.password || !this.confirmPassword) {
        alert('Harap isi form terlebih dahulu')
        return
      }

      // Menonaktifkan tombol create
      this.isRegistering = true

      // Inisialisasi database
      const db = getDatabase()
      const usersRef = dbRef(db, 'users')

      // Menambahkan data user ke dalam database
      await push(usersRef, {
        name: this.name,
        username: this.username,
        password: this.password
      })

      // Reset input field setelah mensubmit
      this.name = ''
      this.username = ''
      this.password = ''
      this.confirmPassword = ''

      // Mengaktifkan kembali tombol register dan mengembalikan teks tombol ke "Create"
      this.isRegistering = false

      // Notifikasi berhasil register
      alert('Registration successful')

      // Route setelah register
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss">
.test {
  min-height: 100vh;
  background-color: #0a0c0e;
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

  .buttonn-show {
    position: absolute;
    top: 260px;
    right: 85px;
    transform: translateY(-50%);
    cursor: pointer;
    text-decoration: none;
    color: #0a0c0e;
  }

  .buttonn-showw {
    position: absolute;
    top: 325px;
    right: 85px;
    transform: translateY(-50%);
    cursor: pointer;
    text-decoration: none;
    color: #0a0c0e;
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
