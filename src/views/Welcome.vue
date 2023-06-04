<!-- Created By Alfian Wahyu -->

<template>
  <div class="container">
    <img
      :class="['fade-in', { delayed: delayed }]"
      src="../assets/img/Logo-chat.png"
      style="width: 250px"
    />
    <div class="container-x">
      <h1 :class="['fade-in', { delayed: delayed }]">Welcome in Chat Apps V2</h1>
    </div>
    <div class="container-button">
      <button
        @click="redirectToLogin"
        :class="['fade-in', 'btn btn-outline-primary', { delayed: delayed }]"
      >
        Mulai
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      delayed: false,
      showWelcome: true
    }
  },

  methods: {
    // link button action
    redirectToLogin() {
      this.showWelcome = false
      this.$router.push({ name: 'login' })
    }
  },

  mounted() {
    this.delayed = true
  }
}
</script>
