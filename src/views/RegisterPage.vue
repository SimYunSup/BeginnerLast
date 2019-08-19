<template>
  <div
    class="registerpage"
  >
    <b-row no-gutters>
      <register
        message="Simulator Register"
      />
    </b-row>
  </div>
</template>

<script>
  import register from '@/components/account/Register'

  export default {
    name: "RegisterPage",
    components: {
      register
    }
  }
</script>

<style scoped>
  .registerpage {
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>