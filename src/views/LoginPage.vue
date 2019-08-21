<template>
  <div class="loginpage">
    <b-row no-gutters>
      <login
        message="Sign in"
      />
    </b-row>
  </div>
</template>

<script>
  import login from '@/components/account/Login.vue'

  export default {
    name: "LoginPage",
    components: {
      login
    }
  }
</script>

<style scoped>
 .loginpage {
    margin-top: 50px;
    height: 80vh;
  }
</style>