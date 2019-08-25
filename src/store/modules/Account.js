import { register, login } from '../../service/accountapi.js'

const state = {
  //if you sign in, id is appear at here.
  account: null,
  rememberID: null
}

const getters= {
  getRememberID(state) {
    return state.rememberID
  },
  getUserName(state) {
    return state.account === null ?
      'User' :
      state.account.lastName
  },
  getLoginState(state) {
    return !!state.account
  }
}

const mutations = {
  loadLoginData(state) {
    console.log(window.$cookies.get('account'))
    state.account = window.$cookies.get('account');
    state.rememberID = window.$cookies.get('rememberID');
  },
  signIn(state , account) {
    state.account = account
  },
  signOut(state) {
    state.account = null
  }
}

const actions = {
  makeAccount({ state }, accountSetting) {
    register.makeAccount(accountSetting)
      .then(
        () => {alert('Register Success')},
        () => {alert('Register failed. Please try again.')}
      )

    return !!state.registeredID
  },
  removeAccount({ state, dispatch }) {
    register.removeAccount(state.account.id)
      .then(
        () => {
          alert('Remove Account Successfully')
          dispatch('signOut')
        },
        () => {alert('Remove Account failed.')}
      )
  },
  idCheck(store, accountID) {
    let idCheckState = false

    register.idCheck(accountID)
      .then(
        () => {
          alert('You can use This ID')
          idCheckState = true
        },
        () => {alert('You can\'t use this ID. Change it')}
      )
    return idCheckState
  },
  signIn({ commit }, accountSetting) {
    return login.loginCheck(accountSetting)
      .then(
        (account) => {
          delete account.password
          window.$cookies.set('account', account, 0)
          commit('signIn', account)

          alert('Login Successfully')

          if(accountSetting.rememberState)
            window.$cookies.set('rememberID', account.id, 60*60*24*365)
          else
            window.$cookies.remove('rememberID')

          return true
        },
        () => {
          alert('Login Failed')
          return false
        }
      )
  },
  signOut({ commit }) {
    commit('signOut')
    window.$cookies.remove('account')
    alert('Logout Successfully')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}