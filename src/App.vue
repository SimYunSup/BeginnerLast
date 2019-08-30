<template>
  <div id="app">
    <navbar/>
    <router-view
      @next="nextPage"
    />

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
    methods: {
      //This is for reuse of DailyStudyPage component
      nextPage() {
        let path = this.$route.path

        if(path === '/scheduler/daily' || path === '/scheduler/before')
          this.$router.push('/scheduler')
        else if(path === '/scheduler')
          this.$router.push('/scheduler/daily')
      }
    },
    components: {
      navbar,
      lower
    }
  }
</script>

<style>

</style>
