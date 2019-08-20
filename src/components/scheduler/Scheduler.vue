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
      class="scheduler__datatable"
      no-gutters
    >
      <div
        class="scheduler__firstcol"
      ></div>
    </b-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "Scheduler",
    data() {
      return {
        dayInfo: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    props: {
      scheduleData: {
        type: Array,
        required: true
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
        isStartTimeBigger: 'scheduler/isStartTimeBigger'
      })
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
        let sleepTime = this.sleepTime()
        let startTime, endTime

        if(this.isStartTimeBigger()) {
          startTime = Number(sleepTime.endTime.slice(0, 2)) * 2
            + (sleepTime.endTime[3] === '0' ? 0 : 1)
          endTime = Number(sleepTime.startTime.slice(0, 2)) * 2
          + (sleepTime.startTime[3] === '0' ? 0 : 1)

          for(let i = startTime; i < endTime; i++){
            let hour = i / 2
            let minute = i % 2
            date.setHours(hour, minute * 30)
            let timeString = new Intl.DateTimeFormat('en-KR', options).format(date)

            timeArray.push(timeString)
          }
        } else {
          startTime = Number(sleepTime.startTime.slice(0, 2)) * 2
            + (sleepTime.startTime[3] === '0' ? 0 : 1)
          endTime = Number(sleepTime.endTime.slice(0, 2)) * 2
            + (sleepTime.endTime[3] === '0' ? 0 : 1)

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
    width: 13%;
    border-right: 1px solid black;
    border-left: 1px solid black;
  }

  .scheduler__datatable {
    position: absolute;
    z-index: 1;
    width: 98%;
    top: 26px;
    left: 0;
  }
</style>