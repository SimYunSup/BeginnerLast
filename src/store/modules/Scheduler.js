const state = {
  sleepTime: {
    startTime: '00:00',
    endTime: '07:00'
  }
}

const getters = {
  getSleepTime({ sleepTime }) {
    return sleepTime
  },
  isStartTimeBigger({ sleepTime }) {

    let startTime = Number(sleepTime.startTime.slice(0, 2))
    let endTime = Number(sleepTime.endTime.slice(0, 2))
    return startTime >= endTime
  }
}

const mutations = {
  setSleepTime(state, sleepTime) {
    state.sleepTime = sleepTime
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}