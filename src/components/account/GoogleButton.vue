<template>
  <b-button
    variant="light"
    class="googlebutton"
  >
    <b-img
      :src="require('../../assets/g-logo.png')"
      width="18"
      height="18"
      alt="google-logo"
      class="googlebutton__logo"
    >
    </b-img>
    <div class="googlebutton__text">
      Sign up with Google
    </div>
  </b-button>
</template>

<script>
  export default {
    name: "GoogleButton"
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  .googlebutton {
    height: 40px;
    width: 100%;
    padding-right: 8px;
    padding-left: 8px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: white;
    border: 1px black solid;
  }

  .googlebutton__logo {
    float: left;
  }
  .googlebutton__text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
</style>