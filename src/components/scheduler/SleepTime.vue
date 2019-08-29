<template>
  <b-row>
    <b-col
      class="border-top py-2"
      cols="12"
    >
      Your Sleeptime :
    </b-col>
    <b-col
      cols="12"
    >
      <b-row
        class="justify-content-center"
        no-gutters
      >
        <b-col
          cols="2"
        >
          <b-form-select
            class="sleeptime__select"
            size="sm"
            v-model="sleepTime.startTime"
            :options="sleepTimeOption.startTime"
          />
        </b-col>
        <b-col
          class="text-center"
          cols="1"
        >
          ~
        </b-col>
        <b-col
          cols="2"
        >
          <b-form-select
            class="sleeptime__select"
            size="sm"
            v-model="sleepTime.endTime"
            :options="sleepTimeOption.endTime"
          />
        </b-col>
        <b-col
          cols="2"
        >
          <b-button
            class="sleeptime__button mx-4"
            variant="info"
            @click="checkCorrect"
          >
            Apply
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: "SleepTime",
    data() {
      return {
        sleepTime: {
          startTime: this.getSleepTime().startTime,
          endTime: this.getSleepTime().endTime
        }
      }
    },
    props: {
      nextLink: {
        type: String
      }
    },
    methods: {
      ...mapState(
        'scheduler',
        {
          timeArray: state => JSON.parse(JSON.stringify(state.timeTableData))
            .map(
              value => JSON.parse(JSON.stringify(value.time))
            )
            .reduce((acc, val) => acc.concat(val), []),
          getSleepTime: state => JSON.parse(JSON.stringify(state.sleepTime))
        }
      ),
      ...mapMutations({
        setSleepTime: 'scheduler/setSleepTime',
      }),
      checkCorrect() {
        let fixedTimeArray = this.timeArray().filter(
          value => value.type === 'fixed'
        )
        let flexTimeArray = this.timeArray().filter(
          value => value.type === 'flex'
        )

        let remainTime = Array.apply(null, {length: 7})
          .map(
            () => {
              return Array.apply(null, {length: 48})
                .map(Function.prototype.call, Number)
            }
          )

        for(let i = 0; i < fixedTimeArray.length; i++) {
          let index = remainTime[fixedTimeArray[i].day]
            .findIndex(
              value => value === fixedTimeArray[i].startTime
            )
          remainTime[fixedTimeArray[i].day].splice(
            index,
            fixedTimeArray[i].endTime - fixedTimeArray[i].startTime
          )
        }

        for(let i = 0; i < 7; i++) {
          let startIndex = remainTime[i]
            .findIndex(
              value => value === this.sleepTime.startTime
            )
          let endIndex = remainTime[i]
            .findIndex(
              value => value === this.sleepTime.endTime
            )

          if(startIndex === -1 || endIndex === -1 ||
            endIndex - startIndex !== this.sleepTime.endTime - this.sleepTime.startTime) {
            alert('Time Scope Error!')
            this.sleepTime = this.getSleepTime()
            return
          } else
            remainTime[i].splice(startIndex, endIndex - startIndex)

          let flexTime =flexTimeArray.reduce(
            (accumulator, currentValue) => {
              if(currentValue.day === i)
                return accumulator + currentValue.time
              return accumulator
            },
            0
          )

          if(remainTime[i].length < flexTime) {
            alert('Time Scope Error!')
            this.sleepTime = this.getSleepTime()
            return
          }
        }

        this.setSleepTime(this.sleepTime)
        this.$router.push(this.nextLink)
      }
    },
    computed: {
      sleepTimeOption() {
        let timeArray= []

        for(let i = 0; i < 48; i++){
          let hour = parseInt(i / 2)
          let minute = (i % 2) * 30
          let timeString = ('0' + hour).slice(-2) + ':' +
            ('00' + minute).slice(-2)

          timeArray.push({value: i, text: timeString})
        }
        let startTimeArray = [].concat(timeArray)
        let endTimeArray = [].concat(timeArray)
        startTimeArray.splice(this.sleepTime.endTime, 1)
        endTimeArray.splice(this.sleepTime.startTime, 1)
        return {
          startTime: startTimeArray,
          endTime: endTimeArray
        }
      }
    }
  }
</script>

<style scoped>
  .sleeptime__select {
    height: 100%;
  }
  .sleeptime__button {
    height: 100%;
    width: 100px;
  }
</style>