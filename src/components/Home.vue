<template>
  <div class="sample">
    <div class="content-contact">
      <div class="sidebar-1">
        <div class="chat-icon">
          <a href="#"> <font-awesome-icon icon="message" /> </a>
        </div>

        <div class="contact-icon">
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
        <div class="judul">
          <h2>Chat</h2>
          <a href="#" @click="toggleChatContainer">
            <font-awesome-icon :icon="['fa', 'pen-to-square']" />
          </a>
        </div>
        <form class="form-search" @submit.prevent="search">
          <input type="text" placeholder="Search" />
          <span class="search-icon">
            <font-awesome-icon :icon="['fas', 'search']" />
          </span>
        </form>

        <div class="contact-chat" v-for="chat in selectedChats" :key="chat.contactId">
          <font-awesome-icon class="icon-user" :icon="['fas', 'circle-user']" />
          <span>{{ getContactName(chat.contactId) }}</span>
        </div>
      </div>

      <div class="addChat-container" v-show="showChatContainer">
        <div class="judul">
          <h2>Chat baru</h2>
        </div>
        <form class="form-search" @submit.prevent="searchUser">
          <input type="text" placeholder="Search" />
          <span class="search-icon">
            <font-awesome-icon :icon="['fas', 'search']" />
          </span>
        </form>
        <div class="Chat">
          <div class="contact-list">
            <div
              class="contact-item"
              v-for="user in users"
              :key="user.id"
              @click="selectContact(user)"
              :class="{ selected: isSelected(user) }"
            >
              <font-awesome-icon class="icon-user" :icon="['fas', 'circle-user']" />
              {{ user.name }}
            </div>
          </div>
        </div>
        <div class="containerr-button">
          <a type="button" href="#" :class="['btn btn-outline-light']" @click="closeChatContainer"
            >Back</a
          >
        </div>
      </div>
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

import { ref, onMounted } from 'vue'

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
      // Data select contact
      selectedContact: null,
      selectedContacts: [],

      // Menyimpan chat yang dipilih
      selectedChats: [],

      // Data show container
      showUserContainer: false,
      showChatContainer: false,

      // Data Login
      loggedInUser: null,
      isLoggedIn: false,

      // Data Contact
      contactList: []
    }
  },

  created() {
    // Periksa apakah ada kontak yang disimpan di localStorage
    const storedContact = localStorage.getItem('selectedContact')
    if (storedContact) {
      this.selectedContact = JSON.parse(storedContact)
    }
  },

  // Configurasi untuk contact-list
  setup() {
    const users = ref([])

    onMounted(async () => {
      try {
        const database = getDatabase()
        const usersRef = dbRef(database, 'users')
        const snapshot = await getDatabaseValue(usersRef)

        if (snapshot.exists()) {
          const usersData = snapshot.val()
          users.value = Object.keys(usersData).map((key) => usersData[key])
        }
      } catch (error) {
        console.log('Error retrieving data : ', error)
      }
    })

    const selectContact = (user) => {
      // melakukan sesuatu ketika kontak dipilih
      console.log('Kontak dipilih : ', user.name)
    }

    return {
      users,
      selectContact
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

    closeUserContainer() {
      this.showUserContainer = false
    },

    toggleChatContainer() {
      this.showChatContainer = !this.showChatContainer
    },

    closeChatContainer() {
      this.showChatContainer = false
    },

    selectContact(contact) {
      const index = this.selectedContacts.findIndex((selected) => selected.id == contact.id)
      if (index > -1) {
        // Kontak belum dipilih, tambahkan ke selectedContacts
        this.selectedContacts.push(contact)
      } else {
        // Tambahkan chat baru untuk kontak
        const newChat = {
          // Informasi chat lainnya
          contactId: contact.id
        }
        this.selectedChats.push(newChat)
      }

      // Simpan informasi kontak ke dalam localStorage
      localStorage.setItem('selectedContact', JSON.stringify(contact))
      localStorage.setItem('selectedContactName', JSON.stringify(this.getContactName(contact.id)))
    },

    isSelected(contact) {
      return this.selectedContacts.some((selected) => selected.id == contact.id)
    },

    getContactName(contactId) {
      const contact = this.users.find((user) => user.id === contactId)
      return contact ? contact.name : ''
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
      background-color: #414141;

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

    .sidebar-2 {
      width: 350px;
      padding: 20px;
      background: #fff;

      .judul {
        display: flex;

        h2 {
          margin-bottom: 15px;
          font-size: 22px;
        }

        a {
          font-size: 18px;
          margin-top: 5px;
          margin-left: 240px;
          align-items: center;
          color: #000000;
        }

        a:hover {
          color: #666666;
        }
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

      .contact-chat {
        display: flex;
        align-items: center;
        margin-top: 20px;

        .icon-user {
          font-size: 32px;
          margin-right: 8px;
        }
      }
    }

    .addChat-container {
      width: 25%;
      height: 80%;
      margin-left: 280px;
      margin-top: 60px;
      padding: 5px;
      border-radius: 8px;
      border: 1px solid #414141;
      position: absolute;
      background-color: #414141;

      .judul {
        margin: 10px;

        h2 {
          color: #fff;
          margin-bottom: 15px;
          font-size: 22px;
        }
      }

      input {
        width: 80%;
        margin-left: 25px;
        margin-right: 25px;
        appearance: none;
        border-radius: 5px;
        outline: none;
        border-bottom: 1px solid #000000;
      }

      .search-icon {
        position: absolute;
        margin-top: 3px;
        margin-left: -55px;
      }

      .Chat {
        display: flex;

        .contact-list {
          font-size: 14px;
          margin-top: 15px;
          margin-left: 20px;
          color: #fff;

          .contact-item {
            cursor: pointer;
          }

          .contact-item:hover {
            width: 260px;
            background-color: #666666;
          }

          .contact-item:active {
            background-color: #0a0c0e;
          }

          div {
            margin-bottom: 10px;
            margin-left: 10px;
          }

          .icon-user {
            margin-right: 10px;
          }
        }
      }

      h3 {
        font-size: large;
        margin: 15px;
        color: #fff;
      }

      .containerr-button {
        align-items: center;
        margin-top: 60px;
        margin-left: 60px;
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
