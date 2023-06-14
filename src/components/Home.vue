<template>
  <div class="sample">
    <div class="content-contact">
      <div class="sidebar-1">
        <div class="user-icon">
          <a href="#" @click="toggleUserContainer">
            <font-awesome-icon :icon="['fas', 'user']" />
          </a>
        </div>
        <div class="contact-user">
          <a href="#" @click="toggleContactContainer">
            <font-awesome-icon :icon="['fas', 'address-book']" />
          </a>
        </div>
      </div>

      <div class="user-container" v-show="showUserContainer">
        <h3>Profile</h3>
        <div class="profile-icon">
          <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <p></p>
        <div class="containerr-button">
          <a type="button" href="/home" :class="['btn btn-outline-light']">Back</a>
        </div>
      </div>

      <div class="contact-container" v-show="showContactContainer">
        <h3>Contact</h3>
        <div class="profile-icon">
          <font-awesome-icon :icon="['fas', 'user']" />
        </div>
        <p></p>
        <div class="containerr-button">
          <a type="button" href="/home" :class="['btn btn-outline-light']">Back</a>
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

// Memasukkan icon id di library
library.add(faSearch)

// Import useAuthStore from auth
import { useAuthStore } from '../assets/js/auth'

export default {
  name: 'Home',

  components: {
    FontAwesomeIcon
  },

  data() {
    return {
      showUserContainer: false,
      showContactContainer: false
    }
  },

  methods: {
    toggleUserContainer() {
      this.showUserContainer = !this.showUserContainer
    },

    toggleContactContainer() {
      this.showContactContainer = !this.showContactContainer
    }
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
.sample {
  display: flex;
  height: 100vh;
  background: rgb(245, 66, 101);

  .content-contact {
    display: flex;

    .sidebar-1 {
      flex-direction: column;
      width: 60px;
      padding: 20px;
      background-color: rgb(245, 66, 101);

      .user-icon {
        margin-left: 2px;
        align-items: center;

        a {
          color: #000000;
        }

        a:hover {
          color: aliceblue;
        }
      }

      .contact-user {
        font-size: 120%;
        margin-top: 10px;
        align-items: center;

        a {
          color: #000000;
        }

        a:hover {
          color: aliceblue;
        }
      }
    }

    .user-container {
      width: 25%;
      height: 40%;
      margin: 5px;
      padding: 5px;
      border-radius: 8px;
      border: 1px solid #414141;
      position: absolute;
      background-color: rgb(245, 66, 101);

      .profile-icon {
        font-size: 25px;
        margin: 20px;
        color: #fff;
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

    .contact-container {
      width: 25%;
      height: 40%;
      margin: 5px;
      padding: 5px;
      border-radius: 8px;
      border: 1px solid #414141;
      position: absolute;
      background-color: rgb(245, 66, 101);

      .profile-icon {
        font-size: 25px;
        margin: 20px;
        color: #fff;
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
    background-color: rgb(245, 66, 101);
  }
}
</style>
