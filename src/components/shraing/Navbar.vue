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
            <template #button-content>{{ userName }}</template>
            <template v-if="loginState">
              <b-dropdown-item
                to="/"
                @click="removeAccount"
              >
                delete Account
              </b-dropdown-item>
              <b-dropdown-item
                to="/"
                @click="logout"
              >
                Logout
              </b-dropdown-item>
            </template>
            <template v-else>
              <b-dropdown-item to="/login">Login</b-dropdown-item>
              <b-dropdown-item to="/register">Register</b-dropdown-item>
            </template>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "Navbar",
    methods: {
      getAddress(name){
        return '/' + name
      },
      ...mapActions(
        {
          removeAccount: 'account/removeAccount',
          logout: 'account/signOut'
        }
      )
    },
    computed: {
      ...mapGetters(
        {
          enabledNav: 'sharing/getEnabledNav',
          navName: 'sharing/getNavName',
          userName: 'account/getUserName',
          loginState: 'account/getLoginState'
        }
      )
    },
    mounted() {
      this.$store.commit('account/loadLoginData')
    }
  }
</script>

<style scoped>

</style>