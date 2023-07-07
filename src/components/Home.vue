<template>
  <div class="sample">
    <div class="content-contact">
      <div class="sidebar-1">
        <div class="chat-icon">
          <a href="#"> <font-awesome-icon icon="message" /> </a>
        </div>

        <div class="contact-icon">
          <a href="#" @click="toggleSidebarContact">
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

      <div class="sidebar-2" v-if="!showSidebarContact">
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
              v-for="(contact, index) in contacts"
              :key="index"
              @click="selectContact(contact)"
              :class="{ selected: isSelected(contacts.id) && !isDuplicateChat(contact.id) }"
            >
              <font-awesome-icon class="icon-user" :icon="['fas', 'circle-user']" />
              <span>{{ contact.name }}</span>
            </div>

            <div v-if="contacts.length === 0" id="contact-message">Not have a contact friend</div>
          </div>
        </div>
        <div class="containerr-button">
          <a type="button" href="#" :class="['btn btn-outline-light']" @click="closeChatContainer"
            >Back</a
          >
        </div>
      </div>

      <div class="sidebar-2" v-if="showSidebarContact">
        <div class="judul">
          <h2>Contact</h2>
        </div>
        <input type="text" placeholder="Search" />
        <span class="search-icon">
          <font-awesome-icon :icon="['fas', 'search']" />
        </span>
        <div class="list-contact-name">
          <div v-for="(contact, index) in contacts" :key="index">
            <font-awesome-icon class="icon-user" :icon="['fas', 'circle-user']" />
            <span>{{ contact.name }}</span>
          </div>
          <div class="alert-no-contacts" v-if="contacts.length === 0" id="contact-message">
            Not have a contact friend
          </div>
        </div>
        <div class="contact-add" @click="toggleContactContainer">
          <font-awesome-icon :icon="['fas', 'circle-plus']" />
        </div>
      </div>

      <div class="contact-container" v-show="showContactContainer">
        <h3>Add Contact</h3>
        <form @submit.prevent="addContact">
          <div class="containerr-inputan">
            <input type="text" v-model="newContactName" />
          </div>
          <div class="containerr-button">
            <button type="sumbit" :class="['btn btn-outline-danger']">Add</button>
            <a
              type="button"
              href="#"
              :class="['btn btn-outline-light']"
              @click="closeContactContainer"
              >Back</a
            >
          </div>
        </form>
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
  equalTo,
  set,
  onValue
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
      // Tambahkan properti newContactName ke dalam data
      newContactName: '',

      // Tambahkan properti contact ke dalam data
      selectedContact: null,
      selectedContacts: [],

      // Tambahkan properti selectedChats ke dalam data
      selectedChats: [],

      // Tambahkan properti container ke dalam data
      showUserContainer: false,
      showChatContainer: false,
      showSidebarContact: false,
      showContactContainer: false,

      // Tambahkan properti delayed ke dalam data
      delayed: false,

      // Tambahkan properti afterClickContact ke dalam data
      afterClickContact: null,

      // Tambahkan properti Login ke dalam data
      loggedInUser: null,
      isLoggedIn: false,

      // Tambahkan properti contactList ke dalam data
      contactList: [],

      // Tambahkan properti userData ke dalam data
      userData: null
    }
  },

  created() {
    // Periksa apakah ada kontak yang disimpan di localStorage
    const storedContact = localStorage.getItem('selectedContact')
    if (storedContact) {
      this.selectedContact = JSON.parse(storedContact)
    }
  },

  // Configurasi untuk Contact-list
  setup() {
    const contacts = ref([])
    const loggedInUser = useAuthStore().user
    const database = getDatabase()
    const usersRef = dbRef(database, 'users')

    onMounted(async () => {
      if (loggedInUser) {
        const loggedInUsername = loggedInUser.username
        const userQuery = query(usersRef, orderByChild('username'), equalTo(loggedInUsername))
        const snapshot = await getDatabaseValue(userQuery)

        if (snapshot.exists()) {
          const userData = snapshot.val()
          const userKey = Object.keys(userData)[0]
          const user = userData[userKey]

          if (user.contacts) {
            const contactKeys = Object.keys(user.contacts)

            for (const contactKey of contactKeys) {
              const contact = user.contacts[contactKey]
              const contactName = contact.name

              if (contactName) {
                contacts.value.push({ id: contactKey, name: contactName })
              }
            }
          }
        }
      }
    })

    return {
      contacts
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

    toggleSidebarContact() {
      this.showSidebarContact = !this.showSidebarContact
    },

    toggleContactContainer() {
      this.showContactContainer = !this.showContactContainer
    },

    closeContactContainer() {
      this.showContactContainer = !this.showContactContainer
    },

    isSelected(contact) {
      return contact && this.selectedContacts.some((selected) => selected.id == contact.id)
    },

    selectContact(contact) {
      const index = this.selectedContacts.findIndex((selected) => selected.id == contact.id)

      // kondisi Jika index === -1, berarti kontak belum ada dalam selectedContacts
      if (index === -1) {
        // Tambahkan kontak baru ke selectedContacts
        this.selectedContacts.push({ id: contact.id, name: contact.name })

        // Tambahkan chat baru untuk kontak
        const newChat = {
          contactId: contact.id,
          contactName: contact.name
        }

        this.selectedChats.push(newChat)

        // Tandai kontak sebagai sudah dipilih
        contact.isSelected = true
      } else {
        // Jika kontak sudah ada, berikan pesan atau lakukan tindakan lain
        console.log('Kontak sudah dipilih sebelumnya')
      }
    },

    getContactName(contactName) {
      const contact = this.contacts.find((c) => c.id === contactName)
      if (contact && contact.name) {
        return contact.name
      }
      return null
    },

    // Configurasi Login
    async fetchLoggedInUser() {
      const authStore = useAuthStore()

      if (authStore.isAuthenticated) {
        const loggedInUsername = authStore.user.username
        const database = getDatabase()
        const usersRef = dbRef(database, 'users')
        const snapshot = await getDatabaseValue(
          query(usersRef, orderByChild('username'), equalTo(loggedInUsername))
        )

        if (snapshot.exists()) {
          const userData = snapshot.val()
          const userKey = Object.keys(userData)[0]
          const loggedInUser = userData[userKey]

          // Pastikan loggedInUser memiliki properti 'name' yang valid
          if (loggedInUser && loggedInUser.name) {
            this.loggedInUser = loggedInUser
          } else {
            this.loggedInUser = null
          }
        } else {
          // Jika data pengguna tidak ditemukan, set loggedInUser menjadi null
          this.loggedInUser = null
        }
      } else {
        // Jika tidak ada autentikasi, set loggedInUser menjadi null
        this.loggedInUser = null
      }
    },

    // Configurasi Add Contact
    async addContact() {
      // logika menambahkan kontak ke daftar contact
      // Menambahkan referensi database
      const database = getDatabase()
      const usersRef = dbRef(database, 'users')

      // Mendapatkan username dari proses login atau otentikasi
      // Ganti dengan nilai username dari proses login
      const loggedInUsername = this.loggedInUser.username

      // Mengambil data pengguna dari database berdasarkan username
      try {
        const snapshot = await getDatabaseValue(usersRef)
        if (snapshot.exists()) {
          const usersData = snapshot.val()
          const user = Object.values(usersData).find(
            (userData) => userData.username === loggedInUsername
          )

          // console.log(user)

          if (user) {
            // Memeriksa apakah kontak yang akan ditambahkan sudah ada di dalam daftar kontak
            if (user.contacts && user.contacts.includes(this.newContactName)) {
              alert("Contact already exists in the user's contact list!")
              return
            }

            // Verifikasi apakah pengguna dengan nama kontak yang baru belum terdaftar
            const contactUser = Object.values(usersData).find(
              (userData) => userData.username === this.newContactName
            )

            // console.log(contactUser)

            if (!contactUser) {
              alert('Contact user does not exist!')
              return
            }

            // Memeriksa apakah pengguna mencoba menambahkan kontak dengan nama pengguna yang digunakan untuk login
            if (contactUser.username === loggedInUsername) {
              alert("You can't add yourself as a contact!")
              return
            }

            const newContact = {
              name: this.newContactName
            }

            if (!user.contacts) {
              user.contacts = []
            }

            user.contacts.push(newContact)

            await set(usersRef, usersData)

            alert('Contact added successfully!')
          } else {
            alert('User not found!')
          }
        }
      } catch (e) {
        alert('Error retrieving user data: ', e)
      }

      this.showContactContainer = false
      this.newContactName = ''
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

        a {
          margin-left: 15px;
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

      .list-contact-name {
        align-items: center;

        .icon-user {
          margin-top: 15px;
          font-size: 20px;
          margin-right: 8px;
        }

        span {
          font-family: 'Raleway', sans-serif;
          font-size: 18px;
        }

        .alert-no-contacts {
          color: #cc3300;
          margin-top: 15px;
          font-size: 16px;
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

      .alert-contact {
        margin-top: 25px;
        color: #cc3300;
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
