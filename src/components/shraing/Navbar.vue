<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="dark"
    fixed="top"
  >
    <b-container>
      <b-navbar-brand
        to="/"
      >
        <b-img
          :src="require('../../assets/sups.jpg')"
          rounded
          width="30"
          height="30"
          alt="sleepy"
        ></b-img>
        Pedogunu
      </b-navbar-brand>

      <b-navbar-toggle
        target="collapse"
      />

      <b-collapse
        id="collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item
            v-for="(name, index) in navName"
            :key="name"
            :to="getAddress(name)"
            :disabled="!enabledNav[index]"
          >
            {{ name }}
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>User</template>
            <b-dropdown-item>Login</b-dropdown-item>
            <b-dropdown-item>Register</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "Navbar",
    methods: {
      getAddress(name){
        return '/' + name
      }
    },
    computed: {
      ...mapGetters(
        {
          enabledNav: 'sharing/getEnabledNav',
          navName: 'sharing/getNavName'
        }
      )
    }
  }
</script>

<style scoped>

</style>