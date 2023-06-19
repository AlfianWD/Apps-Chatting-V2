<template>
  <div class="tes">
    <div class="cards">
      <h3>Update Password</h3>
      <form @submit.prevent="updatePassword">
        <div class="containerr-x mb-3">
          <input v-model="newPassword" type="text" placeholder="New Password" required />
        </div>
        <div class="containerr-x mb-3">
          <input v-model="confirmPassword" type="text" placeholder="Confirm Password" required />
        </div>
        <div class="containerr-button">
          <a type="button" href="/forgot" :class="['btn btn-outline-primary']">Back</a>
          <button type="submit" :class="['btn btn-outline-danger']">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'updatePassword'
}
</script>

<style lang="scss">
.tes {
  min-height: 100vh;
  background-color: #0a0c0e;
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
