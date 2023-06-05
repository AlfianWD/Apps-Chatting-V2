<!-- Created By Alfian Wahyu -->

<template>
  <div class="views">
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

<style>
.views {
  display: flex;
  background-color: white;
  height: 100vh;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 6%;
}

.container-x {
  display: flexbox;
  font-family: 'Raleway', sans-serif;
  margin-top: 45px;
}

.container-button {
  display: flexbox;
  margin-top: 10px;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 2s ease-in-out forwards;
}

.delayed {
  animation-delay: 0.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
