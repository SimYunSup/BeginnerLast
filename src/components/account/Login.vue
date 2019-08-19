<template>
  <b-col
    class="login mt-3 mb-3"
    xl="6"
    offset-xl="3"
    md="8"
    offset-md="2"
    cols="12"
  >
    <div class="login__title">
      <h1>{{ message }}</h1>
    </div>

    <b-form-row>
      <b-col cols="12">
        <b-form-group
          label="ID"
          label-for="identifier"
          invalid-feedback="Write your ID"
          :state="!blankState.id"
        >
          <b-input
            id="identifier"
            v-model="LoginData.id"
            placeholder="Email Address"
            ref="id"
          />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col cols="12">
        <b-form-group
          label="Password"
          label-for="password"
          invalid-feedback="Write your Password"
          :state="!blankState.password"
        >
          <b-input
            type="password"
            id="password"
            v-model="LoginData.password"
            placeholder="Password"
            ref="password"
          />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row
      class="my-1"
    >
      <b-form-group
        class="mx-auto"
      >
        <b-form-checkbox
          v-model="LoginData.rememberState"
        >
          Remember me
        </b-form-checkbox>
      </b-form-group>
    </b-form-row>

    <b-form-row
      class="login__row"
    >
      <b-col
        cols="8"
        offset="2"
      >
        <b-button
          class="login__button"
          variant="primary"
          @click="signIn"
        >
          Sign in
        </b-button>
      </b-col>
    </b-form-row>

    <b-form-row
      class="login__row"
    >
      <b-col cols="5">
        <hr/>
      </b-col>
      <b-col cols="2">
        OR
      </b-col>
      <b-col cols="5">
        <hr/>
      </b-col>
    </b-form-row>
    <b-form-row
      class="login__row"
    >
      <b-col
        cols="8"
        offset="2"
        md="6"
        offset-md="3"
      >
        <google-button></google-button>
      </b-col>
    </b-form-row>
  </b-col>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import googleButton from './GoogleButton'

  export default {
    name: "Login",
    data() {
      return {
        LoginData: {
          id: this.initialID(),
          password: null,
          rememberState: !!this.initialID()
        }
      }
    },
    props: {
      message: {
        type: String,
        default: 'Sign in'
      }
    },
    methods: {
      ...mapGetters(
        {
          initialID: 'account/getRememberID'
        }
      ),
      ...mapActions(
        {
          loginCheck: 'account/signIn'
        }
      ),
      signIn() {
        this.loginCheck(this.LoginData)
          .then(
            result => {
              result ? this.$router.push('/') : {}
            }
          )
      }
    },
    computed: {
      blankState() {
        return {
          id: this.LoginData.id === '',
          password: this.LoginData.password === ''
        }
      }
    },
    components: {
      googleButton
    }
  }
</script>

<style scoped>
  .login {
    padding: 30px;
  }
  @media (min-width: 768px) {
    .login {
      border: 1px dimgray solid;
      padding: 10px;
    }
  }

  .login__title {
    margin: 3%;
    text-align: center;
  }
  .login__row {
    margin-top: 10px;
    text-align: center;
  }
  .login__button {
    width: 100%;
    height: 100%;
  }
</style>