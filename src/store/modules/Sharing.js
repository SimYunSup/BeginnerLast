//This module is for shraing data like below
// navbar-nav enable/disable
// already visited or not(finish simulator or not)

const state = {
  visited: false,
  navbar: {
    simulator: true,
    weather: false,
    wayfinding: false,
    scheduler: false,
    developer: false
  }
}

const getters = {
  getEnabledNav({ navbar }) {
    return Object.values(navbar)
  },
  getNavName({ navbar }) {
    return Object
      .keys(navbar)
      .map(
        (el) => {
          return el.replace(
            /^\w/,
            char => char.toUpperCase()
          )
        }
      )
  }
}

const mutations = {
  changeNavbar(state, item){
    if(item === 'all') {
      state.simulator = true
      state.weather = true
      state.wayfinding = true
      state.scheduler = true
      state.developer = true
    } else
    //item is state to change
      state[item] = true
  },
  changeVisitedCondition(state) {
    state.visited = true
  }
}

export default{
  namespaced: true,
  state,
  getters,
  mutations
}