<template>
  <div
    class="dailystudypage"
  >
    <b-row>
      <b-col
        class="dailystudypage__title text-center"
        cols="12"
      >
        Create Daily Study
      </b-col>

      <b-col
        class="mb-5"
        cols="12"
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <div class="dailystudypage__text">
          Remain Time:
        </div>

        <table
          class="dailystudypage__dailytable mt-2"
        >
          <thead
            class="border-bottom"
          >
            <tr>
              <td
                class="dailystudypage__dailycol text-center"
                v-for="(day, index) in dayInfo"
                :key="index"
              >
                {{ day }}
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                class="text-center"
                v-for="(day, index) in dayInfo"
                :key="index"
              >
                {{ remainTimeArray()[index] }}
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>

      <b-col
        class="dailystudypage__wrapper--table"
        cols="10"
        offset="1"
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <table
          class="dailystudypage__table"
        >
          <thead>
            <tr
              class="border-bottom text-center w-100"
            >
              <td class="dailystudypage__name">Name</td>
              <td>Day</td>
              <td>Time</td>
              <td></td>
            </tr>
          </thead>

          <tbody
            v-for="(timeInfo, index1) in dailyStudyTable"
            :key="index1"
          >
            <template
              v-if="timeInfo.time.length !== 0"
            >
              <tr
                v-for="(time, index2) in timeInfo.time"
                :key="index2"
              >
                <td
                  :rowspan="timeInfo.time.length"
                  v-if="!index2"
                >
                  {{ dailyStudyTable[index1].name }}
                </td>

                <td
                  v-if="dailyStudyTable[index1].time.length !== 0"
                >
                  <div
                    class="width-fit-content mx-auto"
                  >
                    <b-form-select
                      class="border-0 mx-auto dailystudypage__select"
                      v-model="dailyStudyTable[index1].time[index2].day"
                      :options="dayOption(timeInfo.time, dailyStudyTable[index1].time[index2].day)"
                      @change="changeElement(
                        'day',
                        dailyStudyTable[index1].time[index2]
                        )"
                    >
                      <template #first>
                        <option value="null" disabled>---</option>
                      </template>
                    </b-form-select>

                    <b-button
                      variant="success"
                      @click="changeElement(
                        'addDailyRow',
                        dailyStudyTable[index1].time[index2]
                        )"
                    >
                      +
                    </b-button>
                  </div>
                </td>

                <td
                  v-if="dailyStudyTable[index1].time.length !== 0"
                >
                  <div
                    class="mx-auto width-fit-content"
                  >
                    <b-form-select
                      class="dailystudypage__select border-0"
                      v-model="dailyStudyTable[index1].time[index2].time"
                      :options="
                        timeOption(
                          dailyStudyTable[index1].time[index2].day,
                          dailyStudyTable[index1].time[index2].time
                        )"
                      @change="changeElement(
                        'time',
                        dailyStudyTable[index1].time[index2]
                        )"
                    >
                      <template #first>
                        <option value="null" disabled>---</option>
                      </template>
                    </b-form-select>
                  </div>
                </td>

                <td
                  v-if="dailyStudyTable[index1].time.length !== 0"
                >
                  <div
                    class="width-fit-content mx-auto"
                  >
                    <b-button
                      variant="danger"
                      @click="changeElement(
                        'removeRow',
                        dailyStudyTable[index1].time[index2]
                        )"
                    >
                      -
                    </b-button>
                  </div>
                </td>
              </tr>
            </template>
            <template
              v-else
            >
              <tr>
                <td>
                  {{ dailyStudyTable[index1].name }}
                </td>

                <td
                  colspan="3  "
                >
                  <div
                    class="width-fit-content mx-auto"
                  >
                    You should study if you have a exam..
                    <b-button
                      variant="success"
                      @click="changeElement(
                        'addDailyRow',
                        {index1}
                        )"
                    >
                      Do it!
                    </b-button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </b-col>

      <b-col
        class="dailystudypage__buttonrow my-2"
        cols="10"
        offset="1"
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-button
          class="mx-2"
          variant="primary"
          @click="next"
        >
          Done!
        </b-button>
        <b-button
          class="mx-2"
          @click="previous"
        >
          Back
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: "DailyStudyPage",
    data() {
      return {
        dayInfo: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    methods: {
      ...mapGetters({
        timeTable: 'scheduler/getTimeTable',
        sleepTime: 'scheduler/getSleepTime'
      }),
      ...mapMutations({
        changeData: 'scheduler/changePartOfData'
      }),
      remainTimeArray() {

        let timeArray = this.timeTable().map(
          value => JSON.parse(JSON.stringify(value.time))
        )
          .reduce((acc, val) => acc.concat(val), [])
        let fixedTimeArray = timeArray.filter(
            value => value.type === 'fixed'
          )
        let flexTimeArray = timeArray.filter(
          value => value.type === 'flex'
        )
        let remainTime = Array.apply(null, {length: 7})
          .map(
            () => {
              let timeArray = Array.apply(null, {length: 48})
                .map(Function.prototype.call, Number)

              timeArray.splice(
                this.sleepTime().startTime,
                this.sleepTime().endTime
                  - this.sleepTime().startTime
              )

              return timeArray
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
          let index = 0
          let step = 0
          for(let j = 0; j < remainTime[i].length; j++) {
            if(index + step === remainTime[i][j])
              step++
            else if(index === 0 && step <= 2) {
              index = remainTime[i][j]
              step = 1
            } else {
              if (step <= 2) {
                remainTime[i].splice(index, step)
                j -= step
                index = remainTime[i][j]
              } else
                index = remainTime[i][j]

              step = 1
            }
          }
        }
        return Array.apply(null, {length: 7})
          .map(
            (value, index) => {
              let flexTime =flexTimeArray.reduce(
                (accumulator, currentValue) => {
                  if(currentValue.day === index)
                    return accumulator + currentValue.time
                  return accumulator
                },
                0
              )
              let time = remainTime[index].length - flexTime
              let hour = parseInt(time / 2)
              let minute = (time % 2) * 30
              return ('0' + hour).slice(-2) + ':' +
                ('00' + minute).slice(-2)
            }
          )
      },
      dayOption(timeInfo, day) {
        let dayInfo = Array.apply(null, {length: 7})
          .map(
            (value, index) => {
              let date = new Date(2019, 9)
              date.setUTCDate(index + 1)
              let day = date.toUTCString().slice(0, 3)

              return {
                value: index,
                text: day
              }
            }
          )
        for(let i = 0; i < timeInfo.length; i++) {
          let index = dayInfo.findIndex(
            value => value.value === timeInfo[i].day && value.value !== day
          )
          if(index !== -1)
            dayInfo.splice(index, 1)
        }

        return dayInfo
      },
      timeOption(day, time) {
        let remainTime = this.remainTimeArray()[day]
        let numberOfRemainTime = time
          + (remainTime
              ? Number(remainTime.slice(0, 2)) * 2
                + Number(remainTime[3] === 3)
              : 0
          )

        return Array.apply(null, {length: numberOfRemainTime})
          .map(
            (value, index) => {
              let hour = parseInt((index + 1) / 2)
              let minute = ((index + 1) % 2) * 30

              return {
                value: index + 1,
                text: ('0' + hour).slice(-2) + ':' +
                  ('00' + minute).slice(-2)
              }
            }
          )
      },
      changeElement(element, currentValue) {
        switch (element) {
          case 'day': {
            let remainTimeString = this.remainTimeArray()[currentValue.day]
            let remainTime = remainTimeString
              ? Number(remainTimeString.slice(0, 2)) * 2
                + Number(remainTimeString[3] === 3)
              : 0
            if(remainTime - currentValue.time < 0) {
              alert('You Don\'t have Enough Time!')
              return
            }
          }
          // eslint-disable-next-line no-fallthrough
          case 'time':
            this.changeData({
              name: element,
              value: currentValue[element],
              index1: currentValue.index1,
              index2: currentValue.index2
            })
            break
          case 'addDailyRow':
            this.changeData({
              name: 'addDailyRow',
              index1: currentValue.index1
            })
            break
          case 'removeRow':
            this.changeData({
              name: 'removeRow',
              index1: currentValue.index1,
              index2: currentValue.index2
            })
            break
        }
      },
      next() {
        console.log(this.$emit)
        this.$emit('next')
      },
      previous() {
        this.$router.push('/')
      }
    },
    computed: {
      dailyStudyTable() {
        return JSON.parse(JSON.stringify(this.timeTable()))
          .map(
            (value1, index1) => {
              value1.time = JSON.parse(JSON.stringify(value1.time))
                .map(
                  (value2, index2) => {
                    return Object.assign(value2, {index1, index2})
                  }
                )
                .filter(
                  value2 => value2.type === 'flex'
                )

              return value1
            }
          )
          .filter(
            value => {
              if(value.length === 0)
                return value.exam === true
              return true
            }
          )
      }
    }
  }
</script>

<style scoped>
  .dailystudypage {
    padding-top: 100px;
    height: 80%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .dailystudypage__title {
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: 50px;
    height: 10%;
  }
  .dailystudypage__text {
    font-size: 1.2rem;
  }

  .dailystudypage__dailytable {
    width: 100%;
    height: 7%;
  }
  .dailystudypage__wrapper--table {
    height: 450px;
    overflow-y: scroll;
  }
  .dailystudypage__table {
    width: 100%;
  }
  .dailystudypage__name {
    width: 25%;
  }
  .dailystudypage__select {
    width: 100px;
  }
  .dailystudypage__buttonrow {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }

  .width-fit-content {
    width: fit-content;
  }
</style>