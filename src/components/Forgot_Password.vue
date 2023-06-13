<!-- Created By Alfian Wahyu -->

<template>
  <div class="tes">
    <div class="cards">
      <h3>Forgot Password</h3>
      <form @submit.prevent="forgotUser">
        <div class="containerr-x mb-3">
          <input v-model="username" type="text" placeholder="Username or Name" required />
        </div>
        <div class="containerr-button">
          <a type="button" href="/login" :class="['btn btn-outline-primary']">Back</a>
          <button type="submit" :class="['btn btn-outline-danger']">Search</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ref as dbRef, get, orderByChild, equalTo, query } from 'firebase/database'
import { db } from '../assets/js/firebase'

export default {
  name: 'forgotUser',
  setup() {
    const username = ref('')
    const selectedUser = ref(null)
    const newPassword = ref('')
    const confirmPassword = ref('')

    const forgotUser = async () => {
      username: username.value
      try {
        // Inisialisasi database
        const usersRef = dbRef(db, 'users')
        const queryRef = query(usersRef, orderByChild('username'), equalTo(username.value))
        const snapshot = await get(queryRef)

        // Cek apakah data sudah didapatkan atau belom
        if (snapshot.exists()) {
          const userData = snapshot.val()
          const userKey = Object.keys(userData)[0]
          const user = userData[userKey]

          selectedUser.value = {
            password: user.password
          }
        } else {
          selectedUser.value = null

          // notifivkasi jika username tidak ada
          alert('username tidak ada')
        }
      } catch (error) {
        console.error(error)
      }
    }

    return {
      username,
      selectedUser,
      newPassword,
      confirmPassword,
      forgotUser
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
