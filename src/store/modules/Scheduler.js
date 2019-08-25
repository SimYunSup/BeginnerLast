import { data } from '../../service/accountapi.js'

const state = {
  sleepTime: {
    startTime: '01:00',
    endTime: '07:00'
  },
  timeTableData: [
    {
      name: '선형대수학',
      time: [
        {type: 'fixed', startTime: '09:00', endTime: '11:00', day: 2},
        {type: 'fixed', startTime: '14:00', endTime: '15:00', day: 2},
        {type: 'flex', time: '02:00', day: 4}
      ],
      exam: true
    },
    {
      name: 'asdf',
      time: [
        {type: 'fixed', startTime: '09:00', endTime: '13:00', day: 4},
        {type: 'flex', time: '02:00', day: 4}
      ],
      exam: false
    }
  ]
}

const getters = {
  getSleepTime({ sleepTime }) {
    return sleepTime
  },
  getTimeTable({ timeTableData }) {
    //https://github.com/vuejs/Discussion/issues/292
    return JSON.parse(JSON.stringify(timeTableData))
  },
  isStartTimeBigger({ sleepTime }) {

    let startTime = Number(sleepTime.startTime.slice(0, 2))
    let endTime = Number(sleepTime.endTime.slice(0, 2))
    return startTime >= endTime
  },
  getOrderOfSleepTime({ sleepTime }) {
    let startTime = Number(sleepTime.startTime.slice(0, 2)) * 2
      + (sleepTime.startTime[3] === '0' ? 0 : 1)
    let endTime = Number(sleepTime.endTime.slice(0, 2)) * 2
      + (sleepTime.endTime[3] === '0' ? 0 : 1)
    return { startTime, endTime }
  }
}

const mutations = {
  setSleepTime(state, sleepTime) {
    state.sleepTime = sleepTime
  },
  //add new Element timeData Array
  addTimeDataRow(state) {
    state.timeTableData.push({
      name: '',
      time: [{type: 'fixed', startTime: '', endTime: '', day: null}],
      exam: false
    })
  },
  changePartOfData(state, elementInfo) {
    switch (elementInfo.name) {
      case 'name':
        state.timeTableData[elementInfo.index1].name = elementInfo.value
        break;
      case 'exam':
        state.timeTableData[elementInfo.index1].exam = elementInfo.value
        break;
      case 'day':
        state.timeTableData[elementInfo.index1].time[elementInfo.index2].day = elementInfo.value
        break;
      case 'startTime':
        state.timeTableData[elementInfo.index1].time[elementInfo.index2].startTime = elementInfo.value
        break;
      case 'endTime':
        state.timeTableData[elementInfo.index1].time[elementInfo.index2].endTime = elementInfo.value
        break;
      case 'addRow':
        state.timeTableData[elementInfo.index1].time.splice(
          elementInfo.index2,
          0,
          {type: 'fixed', startTime: '', endTime: '', day: null}
        )
        break;
      case 'removeRow':
        if(state.timeTableData[elementInfo.index1].time.length === 1) {
          state.timeTableData.splice(elementInfo.index1, 1)
        } else {
          state.timeTableData[elementInfo.index1].time.splice(elementInfo.index2, 1)
        }
        console.log(state.timeTableData)
        break;
    }
  }
}

const actions = {
  loadData({ state }) {
    let account = window.$cookies.get('account')
    let loadState = false
    if(account){
      data.loadAccountData(account.id, 'scheduler')
        .then(
          (value) => {
            state.timeTableData = value.timeTableData
            state.sleepTime = value.sleepTime
            loadState = true
          }
        )
    }

    return loadState
  },
  addData({ state }) {
    let account = window.$cookies.get('account')

    if(!account) {
      alert('This utility need Sign in.')
      return false
    } else {
      data.addAccountData(
        'scheduler',
        {
        id: account.id,
        timeTableData: state.timeTableData,
        sleepTime: state.sleepTime
      })
        .then(
          () => {alert('Save Completely')},
          () => {alert('Save failed')}
        )
    }
  },
  removeData() {
    let account = window.$cookies.get('account')

    state.timeTableData = []
    state.sleepTime = {
      startTime: '23:00',
      endTime: '07:00'
    }

    data.removeAccountData(account.id, 'scheduler')
      .then(
        () => {alert('Remove completely')},
        () => {alert('Remove Failed')}
      )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}