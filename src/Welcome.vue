<!-- Created By Alfian Wahyu -->

<template>
  <div class="container">
    <img
      :class="['fade-in', { delayed: delayed }]"
      src="./assets/img/logo-chat.png"
      style="width: 250px"
    />
    <div class="container-x">
      <h1 :class="['fade-in', { delayed: delayed }]">Welcome in Chat Apps V2</h1>
    </div>
    <div class="container-button">
      <button :class="['fade-in', 'btn btn-outline-primary', { delayed: delayed }]">Mulai</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  data() {
    return {
      delayed: false
    }
  },

  onMounted() {
    this.delayed = true
  }
}
</script>
