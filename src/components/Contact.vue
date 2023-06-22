<template>
  <div class="sammple">
    <div class="content-contact">
      <div class="sidebar-1">
        <div class="chat-icon">
          <a href="/home"> <font-awesome-icon icon="message" /> </a>
        </div>

        <div class="contact-user">
          <a href="/contact">
            <font-awesome-icon :icon="['fas', 'address-book']" />
          </a>
        </div>

        <div class="user-icon">
          <a href="#" @click="toggleUserContainer">
            <font-awesome-icon :icon="['fas', 'user']" />
          </a>
        </div>
      </div>

      <div class="user-container" v-show="showUserContainer">
        <h3>Profile</h3>
        <div class="profile">
          <div class="profile-icon">
            <font-awesome-icon :icon="['fas', 'user']" />
          </div>
          <p>{{ loggedInUser && loggedInUser.name }}</p>
        </div>
        <div class="containerr-button">
          <a type="button" href="#" :class="['btn btn-outline-light']" @click="closeUserContainer"
            >Back</a
          >
          <a type="button" href="/login" :class="['btn btn-outline-primary']">Logout</a>
        </div>
      </div>

      <div class="sidebar-2">
        <h2>Contact</h2>
        <input type="text" placeholder="Search" />
        <span class="search-icon">
          <font-awesome-icon :icon="['fas', 'search']" />
        </span>
        <div class="contact-list">
          <div v-for="user in users" :key="user.id">
            <font-awesome-icon class="icon-user" :icon="['fas', 'circle-user']" />
            {{ user.name }}
          </div>
        </div>
        <div class="contact-add" @click="toggleContactContainer">
          <font-awesome-icon :icon="['fas', 'circle-plus']" />
        </div>
      </div>

      <div class="contact-container" v-show="showContactContainer">
        <h3>Add Contact</h3>
        <form @submit.prevent="addNewContact">
          <div class="containerr-inputan">
            <input type="text" v-model="newUserName" />
          </div>
          <div class="containerr-button">
            <button type="button" :class="['btn btn-outline-light']">Add</button>
          </div>
        </form>
      </div>
    </div>
    <div class="content-chat">
      <div class="chat-area">
        <img :class="['fade-in', { delayed: delayed }]" src="../assets/img/bg-img.png" />
      </div>
    </div>
  </div>
</template>

<script>
// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// Import database
import {
  getDatabase,
  ref as dbRef,
  get as getDatabaseValue,
  query,
  orderByChild,
  equalTo
} from 'firebase/database'

import { ref, onMounted } from 'vue'

// Memasukkan icon id di library
library.add(faSearch)

// Import useAuthStore from auth
import { useAuthStore } from '../assets/js/auth'

export default {
  name: 'Contact',

  components: {
    FontAwesomeIcon
  },

  data() {
    return {
      // Tambahkan properti container ke dalam data
      showUserContainer: false,
      showContactContainer: false,

      newContactName: '',
      users: [],

      // Tambahkan properti Login ke dalam data
      loggedInUser: null,
      isLoggedIn: false
    }
  },

  // setup() {
  //   const users = ref([])

  //   onMounted(async () => {
  //     try {
  //       const database = getDatabase()
  //       const usersRef = dbRef(database, 'users')
  //       const snapshot = await getDatabaseValue(usersRef)

  //       if (snapshot.exists()) {
  //         const usersData = snapshot.val()
  //         users.value = Object.keys(usersData).map((key) => usersData[key])
  //       }
  //     } catch (error) {
  //       console.log('Error retrieving data : ', error)
  //     }
  //   })

  //   return {
  //     users
  //   }
  // },

  methods: {
    toggleUserContainer() {
      this.showUserContainer = !this.showUserContainer
      this.isLoggedIn = !this.showUserContainer

      if (this.showUserContainer) {
        this.fetchLoggedInUser()
      }
    },

    closeUserContainer() {
      this.showUserContainer = false
    },

    toggleContactContainer() {
      this.showContactContainer = !this.showContactContainer
    },

    async fetchLoggedInUser() {
      const authStore = useAuthStore()

      if (authStore.isAuthenticated) {
        const username = authStore.user.username
        const database = getDatabase()
        const usersRef = dbRef(database, 'users')
        const snapshot = await getDatabaseValue(
          query(usersRef, orderByChild('username'), equalTo(username))
        )

        if (snapshot.exists()) {
          const userData = snapshot.val()
          const userKey = Object.keys(userData)[0]
          const loggedInUser = userData[userKey]
          this.loggedInUser = loggedInUser
        }

        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
    }
  },

  async addContact() {
    // logika menambahkan kontak ke daftar contact
    // Menambahkan referensi database
    const database = getDatabase()
    const usersRef = dbRef(database, 'users')

    // Menambahkan kontak baru
    try {
      const newContactRef = await push(usersRef)
      await set(newContactRef, {
        name: this.newContactName
      })

      console.log('Contact add successfully!')
    } catch (e) {
      console.log('Error adding contact : ', e)
    }

    // Mengambil data kontak dari database
    try {
      const snapshot = await getDatabaseValue(usersRef)

      if (snapshot.exists()) {
        const usersData = snapshot.val()
        users.value = Object.keys(usersData).map((key) => usersData[key])
      }
    } catch (e) {
      console.log('Error retrieving data : ', error)
    }

    // Kembali ke halaman kontak setelah menambahkan kontak
    this.showContactContainer = false
    this.newContactName = ''
  },

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

<style lang="scss">
.sammple {
  display: flex;
  height: 100vh;
  background-color: #0a0c0e;

  .content-contact {
    display: flex;

    .sidebar-1 {
      flex-direction: column;
      width: 60px;
      padding: 20px;
      background-color: #0a0c0e;

      .chat-icon {
        margin-left: 2px;
        margin-bottom: 10px;
        align-items: center;

        a {
          color: #ffffff;
        }

        a:hover {
          color: rgb(158, 158, 158);
        }
      }

      .contact-user {
        font-size: 120%;
        align-items: center;

        a {
          color: #ffffff;
        }

        a:hover {
          color: rgb(158, 158, 158);
        }
      }

      .user-icon {
        margin-top: 480px;
        margin-left: 2px;
        align-items: center;

        a {
          color: #ffffff;
        }

        a:hover {
          color: rgb(158, 158, 158);
        }
      }
    }

    .user-container {
      width: 25%;
      height: 40%;
      margin-left: 10px;
      margin-top: 355px;
      padding: 5px;
      border-radius: 8px;
      border: 1px solid #414141;
      position: absolute;
      background-color: #414141;
      z-index: 1;
      h3 {
        margin: 15px;
        color: #fff;
      }

      .profile {
        display: flex;

        .profile-icon {
          font-size: 25px;
          margin-left: 20px;
          color: #fff;
        }

        p {
          font-size: 25px;
          color: #fff;
          margin-left: 15px;
          align-items: center;
          justify-items: center;
        }

        .containerr-button {
          align-items: center;
          margin-top: 60px;
          margin-left: 60px;
        }
      }
    }

    .contact-container {
      width: 25%;
      height: 40%;
      border-radius: 8px;
      border: 1px solid #414141;
      left: 50%;
      top: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      align-items: center;
      justify-content: center;
      background-color: #414141;
      z-index: 1;

      h3 {
        margin: 15px;
        color: #fff;
      }

      .containerr-inputan {
        input {
          width: 85%;
          margin: 25px;
        }
      }
      .containerr-button {
        margin-left: 50px;
      }
    }

    .sidebar-2 {
      width: 350px;
      padding: 20px;
      background: #fff;

      h2 {
        margin-bottom: 15px;
        font-size: 22px;
      }

      input {
        width: 100%;
        appearance: none;
        border: none;
        outline: none;
        border-bottom: 1px solid #000000;
      }

      .search-icon {
        position: absolute;
        margin-top: 3px;
        margin-left: -25px;
      }

      .contact-list {
        font-size: 18px;
        margin-top: 35px;

        div {
          margin-bottom: 10px;
          margin-left: 10px;
        }

        .icon-user {
          margin-right: 10px;
        }
      }

      .contact-add {
        position: absolute;
        bottom: 50px;
        right: 1000px;
        font-size: 40px;
      }

      .contact-add:hover {
        color: #c0c0c0;
      }
    }
  }

  .content-chat {
    flex: 1;

    .chat-area {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 80px;
      margin: 100px;

      img {
        width: 180px;
        max-width: 180%;
        max-height: 100%;
      }
    }
  }

  .navbar {
    height: 60px;
    background-color: #0a0c0e;
  }
}
</style>
