<!-- Created By Alfian Wahyu -->

<template>
  <div class="tes">
    <div class="cards">
      <div v-if="!showUpdateForm">
        <h3>Forgot Password</h3>
        <form @submit.prevent="forgotUser">
          <div class="containerr-x mb-3">
            <input v-model="username" type="text" placeholder="Username" required />
          </div>
          <div class="containerr-button">
            <a type="button" href="/login" :class="['btn btn-outline-primary']">Back</a>
            <button type="submit" :class="['btn btn-outline-danger']">Search</button>
          </div>
        </form>
      </div>

      <div v-if="showUpdateForm">
        <h3>Update Password</h3>
        <form @submit.prevent="updatePassword">
          <div class="containerr-x mb-3">
            <input v-model="newPassword" type="password" placeholder="New Password" required />
          </div>
          <div class="containerr-x mb-3">
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div class="containerr-button">
            <button type="submit" :class="['btn btn-outline-danger']">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ref as dbRef, get, orderByChild, equalTo, query, update } from 'firebase/database'
import { db } from '../assets/js/firebase'

export default {
  name: 'forgotUser',
  setup() {
    const username = ref('')
    const selectedUser = ref(null)
    const newPassword = ref('')
    const confirmPassword = ref('')
    const showUpdateForm = ref(false)

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
            username: user.username,
            password: user.password
          }

          // Tampilkan form update password
          showUpdateForm.value = true
        } else {
          selectedUser.value = null

          // notifivkasi jika username tidak ada
          alert('username tidak ada')
        }
      } catch (error) {
        console.error(error)
      }
    }

    const updatePassword = async () => {
      // Menyegarkan nilai `selectedUser`
      selectedUser.value = selectedUser.value

      // Cek kondisi apakah new password tidak sama dengan confirm password
      if (newPassword.value === confirmPassword.value) {
        try {
          // Cek apakah telah memilih user dan suer password nya
          if (selectedUser.value && selectedUser.value.password) {
            const usersRef = dbRef(db, 'users')
            const queryRef = query(
              usersRef,
              orderByChild('username'),
              equalTo(selectedUser.value.username)
            )
            const snapshot = await get(queryRef)

            if (snapshot.exists()) {
              const userData = snapshot.val()
              const userKey = Object.keys(userData)[0]
              const userRef = dbRef(db, `users/${userKey}`)
              await update(userRef, { password: newPassword.value })

              alert('Password updated successfully')
              newPassword.value = ''
              confirmPassword.value = ''
              // Tampilkan form pencarian pengguna
              showUpdateForm.value = false
            } else {
              alert('User not found')
            }
          } else {
            alert('No User selected')
          }
        } catch (error) {
          console.error(error)
          alert('Failed to update password!')
        }
      } else {
        alert('New Password and Confirm Password do not macth!')
      }
    }

    return {
      username,
      selectedUser,
      newPassword,
      confirmPassword,
      showUpdateForm,
      forgotUser,
      updatePassword
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
