<!-- Created By Alfian Wahyu -->

<template>
  <div class="tes">
    <div class="cards">
      <h3>Login</h3>
      <form @submit.prevent="loginUser">
        <div class="containerr-x mb-3">
          <input v-model="username" type="text" placeholder="Username" />
        </div>
        <div class="containerr-x mb-3">
          <input v-model="password" type="Password" placeholder="Password" />
          <div class="containerr-forgot">
            <p><a href="">Forgot Password ?</a></p>
          </div>
        </div>
        <div class="containerr-button">
          <button type="submit" :class="['btn btn-outline-danger']">Mulai</button>
        </div>
        <div class="containerr-a mb-3">
          <h6>
            Don't have account?
            <a href="/register">Create your account</a>
          </h6>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '../assets/js/firebase.js'
import { ref as dbRef, get, orderByChild, equalTo, query } from 'firebase/database'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    async loginUser() {
      try {
        const usersRef = dbRef(db, 'users')
        const queryRef = query(usersRef, orderByChild('username'), equalTo(this.username))
        const snapshot = await get(queryRef)

        if (snapshot.exists()) {
          const userData = snapshot.val()
          const userKey = Object.keys(userData)[0]
          const user = userData[userKey]

          if (user.password === this.password) {
            alert('Login berhasil')
            this.$router.push('/')
          } else {
            alert('Login gagal: Password salah')
          }
        } else {
          alert('Login gagal: Username tidak ditemukan')
        }
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
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
  margin-left: 45px;
  margin-right: 45px;
  margin-bottom: 25px;

  button {
    width: 100%;
  }
}
</style>
