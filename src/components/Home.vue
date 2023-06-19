<template>
  <div class="sample">
    <div class="content-contact">
      <div class="sidebar-1">
        <div class="chat-icon">
          <a href="#"> <font-awesome-icon icon="message" /> </a>
        </div>

        <div class="contact-icon">
          <a href="/Contact">
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
          <a type="button" href="/home" :class="['btn btn-outline-light']">Back</a>
          <a type="button" href="/login" :class="['btn btn-outline-primary']">Logout</a>
        </div>
      </div>

      <div class="sidebar-2">
        <h2>Chat</h2>
        <input type="text" placeholder="Search" />
        <span class="search-icon">
          <font-awesome-icon :icon="['fas', 'search']" />
        </span>
      </div>

      <div class="Contact"></div>
    </div>
    <div class="content-chat">
      <div class="chat-area">
        <img :class="['fade-in', { delayed: delayed }]" src="../assets/img/bg-img.png" />
      </div>
      <div v-if="afterClickContact" class="message-area">
        <div class="navbar"></div>
        <div class="chat-area"></div>
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

// Memasukkan icon id di library
library.add(faSearch)

// Import useAuthStore from auth
import { useAuthStore } from '../assets/js/auth'
import { getAuth } from 'firebase/auth'

export default {
  name: 'Home',

  components: {
    FontAwesomeIcon
  },

  data() {
    return {
      showUserContainer: false,
      loggedInUser: null,
      isLoggedIn: false
    }
  },

  methods: {
    toggleUserContainer() {
      this.showUserContainer = !this.showUserContainer
      this.isLoggedIn = !this.showUserContainer

      if (this.showUserContainer) {
        this.fetchLoggedInUser()
      }
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
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    // Menggunakan store auth
    const authStore = useAuthStore()

    // Mengecek status autentikasi pengguna sebelum memasuki halaman
    if (!authStore.isAuthenticated) {
      // Jika belum login dan tidak dalam user-container, redirect ke halaman login
      next('/login')
    } else {
      // Jika sudah login atau masih dalam user-container, izinkan akses ke halaman Home
      next()
    }
  }
}
</script>

<style lang="scss">
.sample {
  display: flex;
  height: 100vh;
  background: #0a0c0e;

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

      .contact-icon {
        margin-left: 2px;
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
      margin-top: 350px;
      padding: 5px;
      border-radius: 8px;
      border: 1px solid #414141;
      position: absolute;
      background-color: #0a0c0e;

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
      }

      h3 {
        margin: 15px;
        color: #fff;
      }

      .containerr-button {
        align-items: center;
        margin-top: 60px;
        margin-left: 60px;
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
