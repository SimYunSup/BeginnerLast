<template>
  <div
    class="scheduler"
  >
    <table
      class="scheduler__table"
    >
      <thead>
        <tr>
          <td
            class="scheduler__head--first"
          ></td>
          <td
            class="scheduler__head"
            v-for="(day, index) in dayInfo"
            :key="index"
          >
            {{ day }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="scheduler__dailyrow"
          :style="timeTable.dailyRowStyle"
        >
          <td
            class="scheduler__firstcol"
          >
            Daliy
          </td>
          <td
            v-for="day in dayInfo"
            class="scheduler__col"
            :key="day"
          >
          </td>
        </tr>

        <tr
          v-for="(timeString, index) in timeInfo"
          :style="tableRowStyle(timeString)"
          :key="index"
        >
          <td
            class="scheduler__firstcol"
          >
            {{ timeString }}
          </td>

          <td
            v-for="day in dayInfo"
            class="scheduler__col"
            :key="day"
          ></td>
        </tr>
      </tbody>
    </table>
    <b-row
      class="scheduler__dailytable"
      no-gutters
    >
      <div
        class="scheduler__firstcol"
      ></div>

      <b-col
        v-for="(day, index) in timeTable.dailyTable"
        class="scheduler__datacol"
        :key="index"
      >
        <div
          v-for="(dailyInfo, index) in day"
          :style="dataColStyle(dailyInfo)"
          :key="index"
        >
          <div
            class="scheduler__datatitle"
          >
            {{ dailyInfo.name }}
          </div>

          <div
            class="scheduler__datatime"
          >
            {{ dailyInfo.time }}
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row
      class="scheduler__weeklytable"
      :style="timeTable.weeklyTableStyle"
      no-gutters
    >
      <div
        class="scheduler__firstcol"
      ></div>

      <b-col
        v-for="(day, index) in timeTable.weeklyTable"
        class="scheduler__datacol"
        :key="index"
      >
        <div
          v-for="(dayInfo, index) in day"
          class="scheduler__element"
          :style="dataColStyle(dayInfo)"
          :key="index"
        >
          <div
            class="scheduler__datatitle"
          >
            {{ dayInfo.name }}
          </div>

          <div
            class="scheduler__datatime"
          >
            {{ dayInfo.startTime }}
            ~
            {{ dayInfo.endTime}}
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import randomColor from 'randomcolor'

  export default {
    name: "Scheduler",
    data() {
      return {
        dayInfo: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    methods: {
      tableRowStyle(timeString) {
        let time = timeString.split('')

        return {
          'border-bottom': time[3] === '0' ? '1px dashed black' : '1px solid black'
        }
      },
      ...mapGetters({
        sleepTime: 'scheduler/getSleepTime',
        isStartTimeBigger: 'scheduler/isStartTimeBigger',
        scheduleData: 'scheduler/getTimeTable',
        orderSleepTime: 'scheduler/getOrderOfSleepTime'
      }),
      dataColStyle(timeInfo) {
        return {
          top: timeInfo.topPixel * 50 + 'px',
          width: '100%',
          height: timeInfo.heightPixel * 50 + 'px',
          'background-color': timeInfo.color
        }
      }
    },
    computed: {
      timeInfo() {
        let date = new Date(2019, 1)
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }
        let timeArray= []
        let startTime, endTime

        if(this.isStartTimeBigger()) {
          startTime = this.orderSleepTime().endTime
          endTime = this.orderSleepTime().startTime

          for(let i = startTime; i < endTime; i++){
            let hour = i / 2
            let minute = i % 2
            date.setHours(hour, minute * 30)
            let timeString = new Intl.DateTimeFormat('en-KR', options).format(date)

            timeArray.push(timeString)
          }
        } else {
          startTime = this.orderSleepTime().startTime
          endTime = this.orderSleepTime().endTime

          for(let i = 0; i < 48; i++) {
            let hour = i / 2
            let minute = i % 2
            date.setHours(hour, minute * 30)
            let timeString = new Intl.DateTimeFormat('en-KR', options).format(date)

            timeArray.push(timeString)
          }

          timeArray.splice(startTime, endTime - startTime)
        }
        return timeArray
      },
      timeTable() {
        let timesInfo = JSON.parse(JSON.stringify(this.scheduleData()))
          .map(
            value => {
              let subjectInfo = JSON.parse(JSON.stringify(value.time))
              return subjectInfo.map(
                  element => {
                    return Object.assign(element, {name: value.name})
                  }
                )
            }
          )
        let sleepTimeInfo = {
          startOrder: this.orderSleepTime().startTime,
          scope: this.orderSleepTime().endTime
            - this.orderSleepTime().startTime
        }
        const orderOfTime = (string) => {
          return Number(string.slice(0, 2)) * 2
            + (string[3] === '0' ? 0 : 1)
        }
        //count daily column
        let dailyColumnNumber = Array.apply(null, {length: 7})
          .map( () => { return 0 })
        //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
        let timeInfoArray = [].concat.apply([], timesInfo)
          .map(
            value => {
              let topPixel = 0
              let heightPixel = 1

              if(value.type === 'flex') {
                topPixel = (dailyColumnNumber[value.day]++)
              } else {
                let orderOfStartTime = orderOfTime(value.startTime)
                topPixel = (sleepTimeInfo.startOrder > orderOfStartTime)
                  ? orderOfStartTime
                  : orderOfStartTime - sleepTimeInfo.scope
                heightPixel = orderOfTime(value.endTime) - orderOfStartTime
              }

              let addValue = {
                topPixel,
                heightPixel,
                color : randomColor({ luminosity: 'light' })
              }

              return Object.assign(value, addValue)
            }
          )
        //This is for top attribute in datatable column below daily column
        let weeklyTable = Array.apply(null, {length: 7})
          .map(
            (value, index) => {
              let array = timeInfoArray.filter(
                element => {
                  return element.day === index && element.type === 'fixed'
                }
              )
              return array === [] ? [] : array
            }
          )
        let dailyTable = Array.apply(null, {length: 7})
          .map(
            (value, index) => {
              let array = timeInfoArray.filter(
                element => {
                  return element.day === index && element.type === 'flex'
                }
              )
              return array === [] ? [] : array
            }
          )
        let maxOfDailyColumn = Math.max.apply(null, dailyColumnNumber)
        let weeklyTableTopPixel = 26 + (maxOfDailyColumn ? maxOfDailyColumn * 50 : 50)

        return {
          weeklyTable,
          dailyTable,
          weeklyTableStyle: {
            top: weeklyTableTopPixel + 'px'
          },
          dailyRowStyle: {
            height: (maxOfDailyColumn ? maxOfDailyColumn * 50 : 50) + 'px'
          }
        }
      }
    }
  }
</script>

<style scoped>
  .scheduler {
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .scheduler__table {
    border-collapse: collapse;
    width: 98%;
  }

  .scheduler__head {
    text-align: center;
    height: 20px;
  }
  .scheduler__dailyrow {
    border-bottom: 1px solid black;
  }
  .scheduler__firstcol {
    text-align: center;
    width: 9%;
    height: 50px;
  }
  .scheduler__col {
    width: 50px;
    border-right: 1px solid black;
    border-left: 1px solid black;
  }

  .scheduler__dailytable {
    position: absolute;
    z-index: 1;
    width: 98%;
    top: 26px;
    left: 0;
  }
  .scheduler__weeklytable {
    position: absolute;
    z-index: 1;
    width: 98%;
    height: fit-content;
    left: 0;
  }
  .scheduler__datacol {
    position: relative;
    width: 100%;
    height: fit-content;
  }
  .scheduler__element {
    position: absolute;
    z-index: 1;
  }
  .scheduler__datatitle {
    font-size: 1.05em;
    font-weight: bold;
  }
  .scheduler__datatime {
    font-size: 0.6rem;
  }
</style>