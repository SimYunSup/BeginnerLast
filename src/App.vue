<template>
  <div id="app">
    <navbar/>
    <router-view/>

    <lower>
      <b-col
        cols="3"
      >
        <b-link
          href="https://www.facebook.com/pedogunu"
          target="_blank"
        >
          dev's facebook
        </b-link>
      </b-col>
      <b-col
        cols="3"
      >
        <b-link
          href="mailto:pedogunu@gmail.com"
          target="_blank"
        >
          dev's email
        </b-link>
      </b-col>
    </lower>
  </div>
</template>

<script>
  import navbar from '@/components/shraing/Navbar.vue'
  import lower from '@/components/shraing/Lower.vue'

  export default {
    components: {
      navbar,
      lower
    }
  }
</script>

<style>

</style>
