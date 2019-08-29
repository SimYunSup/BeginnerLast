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
            v-for="(day, index) in dayInfo"
            :key="index"
          >
            <div
              class="scheduler__head"
            >
              {{ day }}
            </div>
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
          class="scheduler__row"
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
        class="scheduler__firstcol--over"
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
        class="scheduler__firstcol--over"
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
  import { mapState, mapGetters } from 'vuex'
  import randomColor from 'randomcolor'

  export default {
    name: "Scheduler",
    data() {
      return {
        dayInfo: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        colorArray: randomColor({
          count: 48 * 7,
          luminosity: 'light'
        })
      }
    },
    methods: {
      tableRowStyle(timeString) {
        let time = timeString.split('')

        return {
          'border-bottom': time[3] === '0' ? '1px dashed black' : '1px solid black'
        }
      },
      //https://codeburst.io/vuex-getters-are-great-but-dont-overuse-them-9c946689b414
      ...mapState(
        'scheduler',
        {
          scheduleData: state => JSON.parse(JSON.stringify(state.timeTableData))
        }
      ),
      ...mapGetters({
        sleepTime: 'scheduler/getSleepTime',
        isStartTimeBigger: 'scheduler/isStartTimeBigger'
      }),
      dataColStyle(timeInfo) {
        return {
          top: timeInfo.topPixel * 70 + 'px',
          width: '100%',
          height: timeInfo.heightPixel * 70 + 'px',
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
          startTime = this.sleepTime().endTime
          endTime = this.sleepTime().startTime

          for(let i = startTime; i < endTime; i++){
            let hour = i / 2
            let minute = i % 2
            date.setHours(hour, minute * 30)
            let timeString = new Intl.DateTimeFormat('en-KR', options).format(date)

            timeArray.push(timeString)
          }
        } else {
          startTime = this.sleepTime().startTime
          endTime = this.sleepTime().endTime

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
        let timesInfo = this.scheduleData()
          .map(
            (value, index) => {
              let subjectInfo = JSON.parse(JSON.stringify(value.time))
              return subjectInfo.map(
                value1 => Object.assign(
                  value1,
                  {
                    name: value.name,
                    color: this.colorArray[index]
                  }
                )
              )
            }
          )
        let sleepTimeInfo = {
          startOrder: this.sleepTime().startTime,
          scope: this.sleepTime().endTime
            - this.sleepTime().startTime
        }

        //count daily column
        let dailyColumnNumber = Array.apply(null, {length: 7})
          .map(() => 0)
        //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
        let timeInfoArray = [].concat.apply([], timesInfo)
          .map(
            value => {
              let topPixel = 0
              let heightPixel = 1

              if(value.type === 'flex') {
                topPixel = (dailyColumnNumber[value.day]++)
              } else {
                if(value.startTime !== null && value.endTime !== null) {
                  topPixel = (sleepTimeInfo.startOrder > value.startTime)
                    ? value.startTime
                    : value.startTime - sleepTimeInfo.scope
                  heightPixel = value.endTime - value.startTime
                } else {
                  return {}
                }
              }
              let addValue = {
                topPixel,
                heightPixel
              }

              return Object.assign(value, addValue)
            }
          )
        let weeklyTable = Array.apply(null, {length: 7})
          .map(
            (value, index) => {
              let array = timeInfoArray.filter(
                element =>
                  element.day === index && element.type === 'fixed'
              )
                .map(
                  element => {
                    let startHour = parseInt(element.startTime / 2)
                    let startMinute = (element.startTime % 2) * 30
                    element.startTime = ('0' + startHour).slice(-2) + ':' +
                      ('00' + startMinute).slice(-2)

                    let endHour = parseInt(element.endTime / 2)
                    let endMinute = (element.endTime % 2) * 30
                    element.endTime = ('0' + endHour).slice(-2) + ':' +
                      ('00' + endMinute).slice(-2)

                    return element
                  }
              )

              return array === [] ? [] : array
            }
          )
        //This is for top attribute in datatable column below daily column
        let dailyTable = Array.apply(null, {length: 7})
          .map(
            (value, index) => {
              let array = timeInfoArray.filter(
                element =>
                  element.day === index && element.type === 'flex'
              )
                .map(
                  element => {
                    let hour = parseInt(element.time / 2)
                    let minute = (element.time % 2) * 30
                    element.time = ('0' + hour).slice(-2) + ':' +
                      ('00' + minute).slice(-2)

                    return element
                  }
                )

              return array === [] ? [] : array
            }
          )
        let maxOfDailyColumn = Math.max.apply(null, dailyColumnNumber)
        let weeklyTableTopPixel = 30 + (maxOfDailyColumn ? maxOfDailyColumn * 70 : 70)

        return {
          weeklyTable,
          dailyTable,
          weeklyTableStyle: {
            top: weeklyTableTopPixel + 'px'
          },
          dailyRowStyle: {
            height: (maxOfDailyColumn ? maxOfDailyColumn * 70 : 70) + 'px'
          }
        }
      }
    }
  }
</script>

<style scoped>
  .scheduler {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 800px;
    height: 100%;
  }
  .scheduler__table {
    table-layout: fixed;
  }

  .scheduler__head {
    text-align: center;
    height: 30px;
  }
  .scheduler__dailyrow {
    border-bottom: 1px solid black;
  }
  .scheduler__row {
    height: 50px;
  }
  .scheduler__firstcol {
    text-align: center;
    width: 70px;
    height: 70px;
  }
  .scheduler__col {
    width: 100px;
    height: 70px;
  }

  .scheduler__dailytable {
    position: absolute;
    z-index: 1;
    width: 770px;
    top: 30px;
    left: 0;
  }
  .scheduler__firstcol--over {
    width: 70.5px;
    height: 70px;
  }
  .scheduler__weeklytable {
    position: absolute;
    z-index: 1;
    height: fit-content;
    left: 0;
  }
  .scheduler__datacol {
    position: relative;
    width: 100px;
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