<template>
  <div class="sammple">
    <div class="contentt-contact">
      <div class="sidebarr-1">
        <div class="chatt-icon">
          <a href="#"> <font-awesome-icon icon="message" /> </a>
        </div>

        <div class="contactt-user">
          <a href="/Contact">
            <font-awesome-icon :icon="['fas', 'address-book']" />
          </a>
        </div>

        <div class="user-icon">
          <a href="#" @click="toggleUserContainer">
            <font-awesome-icon :icon="['fas', 'user']" />
            <p>{{ loggedInUser && loggedInUser.name }}</p>
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

      <div class="Contact-container" v-show="showContactContainer">
        <h3>Add Contact</h3>
        <form action="">
          <div class="containerr-inputan">
            <input type="text" />
          </div>
          <div class="containerr-button">
            <a type="button" :class="['btn btn-outline-light']">Add</a>
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
import { ref, onMounted } from 'vue'
import { getDatabase, ref as dbRef, get as getDatabaseValue } from 'firebase/database'

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
      showUserContainer: false,
      showContactContainer: false,
      newContactName: '',
      users: [],
      isLoggedIn: true
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
    },

    toggleContactContainer() {
      this.showContactContainer = !this.showContactContainer
    }
  },

  //   async addContact() {
  //     // logika menambahkan kontak ke daftar contact
  //     // Menambahkan referensi database
  //     const database = getDatabase()
  //     const usersRef = dbRef(database, 'users')

  //     // Menambahkan kontak baru
  //     try {
  //       const newContactRef = await push(usersRef)
  //       await set(newContactRef, {
  //         name: this.newContactName
  //       })

  //       console.log('Contact add successfully!')
  //     } catch (e) {
  //       console.log('Error adding contact : ', e)
  //     }

  //     // Mengambil data kontak dari database
  //     try {
  //       const snapshot = await getDatabaseValue(usersRef)

  //       if (snapshot.exists()) {
  //         const usersData = snapshot.val()
  //         users.value = Object.keys(usersData).map((key) => usersData[key])
  //       }
  //     } catch (e) {
  //       console.log('Error retrieving data : ', error)
  //     }

  //     // Kembali ke halaman kontak setelah menambahkan kontak
  //     this.showContactContainer = false
  //     this.newContactName = ''
  //   }
  // }

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
  background-color: #0a0c0e;
  .content-contact {
    display: flex;

    .sidebar-1 {
      flex-direction: column;
      width: 60px;
      padding: 20px;
      background-color: #0a0c0e;

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
      background-color: #0a0c0e;

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
