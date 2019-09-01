import { data } from '../../service/accountapi.js'

const state = {
  sleepTime: {
    startTime: 2,
    endTime: 14
  },
  timeTableData: []
}

const getters = {
  getSleepTime({ sleepTime }) {
    return JSON.parse(JSON.stringify(sleepTime))
  },
  getTimeTable({ timeTableData }) {
    //https://github.com/vuejs/Discussion/issues/292
    return JSON.parse(JSON.stringify(timeTableData))
  },
  isStartTimeBigger({ sleepTime }) {
    return sleepTime.startTime >= sleepTime.endTime
  },
}

const mutations = {
  setSleepTime(state, sleepTime) {
    state.sleepTime = sleepTime
  },
  //add new Element timeData Array
  addTimeDataRow(state) {
    state.timeTableData.push({
      name: '',
      time: [{type: 'fixed', startTime: null, endTime: null, day: null}],
      exam: false
    })
  },
  changePartOfData(state, elementInfo) {
    console.log(elementInfo)
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
      case 'time':
        state.timeTableData[elementInfo.index1].time[elementInfo.index2].time = elementInfo.value
        break;
      case 'addRow':
        state.timeTableData[elementInfo.index1].time.splice(
          elementInfo.index2,
          0,
          {type: 'fixed', startTime: null, endTime: null, day: null}
        )
        break;
      case 'addDailyRow':
        state.timeTableData[elementInfo.index1].time.push(
          {type: 'flex', time: null, day: null}
        )
        break;
      case 'removeRow':
        if(state.timeTableData[elementInfo.index1].time.length === 1) {
          state.timeTableData.splice(elementInfo.index1, 1)
        } else {
          state.timeTableData[elementInfo.index1].time.splice(elementInfo.index2, 1)
        }
        break;
    }
    console.log(state.timeTableData)
  }
}

const actions = {
  loadData({ state }) {
    let account = window.$cookies.get('account')
    if(account){
      return data.loadAccountData(account.id, 'scheduler')
        .then(
          (value) => {
            state.timeTableData = value.timeTableData
            state.sleepTime = value.sleepTime
          }
        )
    } else {
      return Promise.reject()
    }

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
        () => {alert('Remove Account Data Completely')},
        () => {alert('Remove Account Data Failed')}
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