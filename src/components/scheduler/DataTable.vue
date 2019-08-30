<template>
  <div
    class="datatable"
  >
    <div
      class="datatable__sleeptime"
      v-if="isWidthExtraLarge"
    >
      <sleep-time/>
    </div>

    <div
      class="datatable__wrapper--table"
    >
      <table
        class="datatable__table"
      >
        <thead>
          <tr
            class="border-bottom text-center w-100"
          >
            <td class="datatable__wrapper--name">Name</td>
            <td class="datatable__wrapper--checkbox">Exam</td>
            <td class="datatable__wrapper--day">Day</td>
            <td class="datatable__wrapper--time">Time</td>
            <td class="datatable__wrapper--button"></td>
          </tr>
        </thead>

        <tbody
          v-for="(timeInfo, index1) in timeTable"
          :key="index1"
        >
          <tr
            v-for="(time, index2) in timeInfo.time"
            :key="index2"
          >
            <td
              :rowspan="timeInfo.time.length"
              v-if="!index2"
            >
              <b-input
                class="border-0"
                v-model="timeTable[index1].name"
                placeholder="Name"
                @input="changeElement('name', index1)"
              />
            </td>

            <td
              :rowspan="timeInfo.time.length"
              v-if="!index2"
            >
              <b-form-checkbox
                class="mx-auto datatable__checkbox"
                v-model="timeTable[index1].exam"
                @change="changeElement('exam', index1)"
              />
            </td>

            <td>
              <div
                class="width-fit-content mx-auto"
              >
                <b-form-select
                  class="border-0 datatable__day"
                  size="sm"
                  v-model="timeTable[index1].time[index2].day"
                  :options="dayOption"
                  :disabled="timeTable[index1].time[index2].type !== 'fixed'"
                  @change="changeElement('day', index1, index2)"
                >
                  <template #first>
                    <option value="null" disabled>---</option>
                  </template>
                </b-form-select>

                <b-button
                  size="sm"
                  variant="success"
                  v-show="isLastFixedTime([index1, index2])"
                  @click="changeElement('addRow', index1, index2)"
                >
                  +
                </b-button>
              </div>
            </td>

            <td>
              <div
                class="mx-auto width-fit-content"
                v-if="timeTable[index1].time[index2].type === 'fixed'"
              >
                <b-form-select
                  class="datatable__select border-0"
                  size="sm"
                  v-model="timeTable[index1].time[index2].startTime"
                  :options="fixedTimeOption('start')"
                  @change="changeElement('startTime', index1, index2)"
                >
                  <template #first>
                    <option value="null" disabled>---</option>
                  </template>
                </b-form-select>
                ~
                <b-form-select
                  class="datatable__select border-0"
                  size="sm"
                  v-model="timeTable[index1].time[index2].endTime"
                  :options="fixedTimeOption('end')"
                  @change="changeElement('endTime', index1, index2)"
                >
                  <template #first>
                    <option value="null" disabled>---</option>
                  </template>
                </b-form-select>
              </div>
              <div
                class="mx-auto width-fit-content"
                v-else
              >
                {{ flexTime(timeTable[index1].time[index2].time) }}
              </div>
            </td>

            <td>
              <div
                class="width-fit-content mx-auto"
              >
                <b-button
                  size="sm"
                  variant="danger"
                  @click="changeElement('removeRow', index1, index2)"
                >
                  -
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="datatable__buttonrow"
    >
      <b-button
        class="mx-1"
        variant="success"
        @click="addTimeRow"
      >
        +
      </b-button>
      <b-button
        class="mx-1"
        variant="info"
        @click="nextPage"
      >
        create daily study
      </b-button>
      <b-button
        class="mx-1"
        variant="primary"
        @click="saveData"
      >
        Save
      </b-button>
      <b-button
        class="mx-1"
        variant="danger"
        @click="resetData"
      >
        Reset
      </b-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import SleepTime from "./SleepTime";

  export default {
    name: "DataTable",
    data() {
      return {
        sleepTime: {
          startTime: this.getSleepTime().startTime,
          endTime: this.getSleepTime().endTime
        },
        windowWidth: window.innerWidth,
        timeTable: JSON.parse(JSON.stringify(this.getTimeTable())).map(
          (value) => {
            value.time = JSON.parse(JSON.stringify(value.time))
            return value
          }
        )
      }
    },
    //props를 통해 배열/객체를 가져오는 경우 참조를 전달하므로
    //하위 컴포넌트에서 바꾸는 경우 상위 컴포넌트에 영향을 준다!
    methods: {
      ...mapState(
        'scheduler',
        {
          getTimeTable: state => JSON.parse(JSON.stringify(state.timeTableData))
        }
      ),
      ...mapGetters({
        getSleepTime: 'scheduler/getSleepTime',
        isStartTimeBigger: 'scheduler/isStartTimeBigger'
      }),
      ...mapMutations({
        addTimeDataRow: 'scheduler/addTimeDataRow',
        changeData: 'scheduler/changePartOfData'
      }),
      ...mapActions({
        saveData: 'scheduler/addData',
        resetData: 'scheduler/removeData'
      }),
      fixedTimeOption(time) {
        //time is 'start' or 'end'
        let date = new Date(2019, 1)
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }
        let timeArray= []
        let startTime, endTime

        if(this.isStartTimeBigger()) {
          startTime = this.getSleepTime().endTime
          endTime = this.getSleepTime().startTime

          for(let i = startTime + (time === 'start' ? 0 : 1);
              i < endTime + (time === 'start' ? 0 : 1);
              i++) {
            let hour = i / 2
            let minute = i % 2
            date.setHours(hour, minute * 30)
            let timeString = new Intl.DateTimeFormat('en-KR', options).format(date)

            timeArray.push({
              text: timeString,
              value: i
            })
          }
        } else {
          startTime = this.getSleepTime().startTime
          endTime = this.getSleepTime().endTime

          for(let i = (time === 'start' ? 0 : 1);
              i < 48 + (time === 'start' ? 0 : 1);
              i++) {
            let hour = i / 2
            let minute = i % 2
            date.setHours(hour, minute * 30)
            let timeString = new Intl.DateTimeFormat('en-KR', options).format(date)

            timeArray.push({
              text: timeString,
              value: i
            })
          }

          timeArray.splice(startTime, endTime - startTime)
        }
        return timeArray
      },
      isLastFixedTime(indexArray) {
        let index = this.timeTable[indexArray[0]].time.findIndex(
          (value, index, array) => {
            if(index + 1 === array.length) {
              return true
            }
            return array[index + 1].type === 'flex'
          }
        )

        return index === -1 ?
          indexArray[2] === this.timeTable[indexArray[0]].time.length :
          index === indexArray[1]
      },
      changeElement(element, index1, index2) {
        if(/day|Time/.test(element)) {
          let startTime = this.timeTable[index1].time[index2].startTime
          let endTime = this.timeTable[index1].time[index2].endTime
          if(startTime === null || endTime === null) {
            this.changeData({
              name: element,
              value: this.timeTable[index1].time[index2][element],
              index1,
              index2
            })
            return true
          }

          let timeInfo = this.timeTable[index1].time[index2]

          let dayArray = this.timeTable.map(
            value => JSON.parse(JSON.stringify(value.time))
                .filter(
                  value1 =>
                    value1.day === timeInfo.day && value1.type === 'fixed'

                )
                .map(
                  value1 => Object.assign(value1, {name: value.name})
                )
          )
            .reduce((acc, val) => acc.concat(val), [])

          let timeArray = Array.apply(null, {length: 48})
            .map(Function.prototype.call, Number)

          timeArray.splice(
            this.getSleepTime().startTime,
            this.getSleepTime().endTime
            - this.getSleepTime().startTime
          )

          for(let i = 0; i < dayArray.length; i++) {
            let startIndex = timeArray.findIndex(
              value => value === dayArray[i].startTime
            )
            let endIndex = timeArray.findIndex(
              value => value === dayArray[i].endTime - 1
            )
            let scope = dayArray[i].endTime - dayArray[i].startTime

            if(endIndex - startIndex + 1 === scope)
              timeArray.splice(startIndex, scope)
            else {
              alert('Time Scope Error. Enter Right Scope.')
              this.timeTable = this.getTimeTable()
              return false
            }
          }
        }

        if(!/Row/.test(element)) {
          let isNeedIndex2 = /day|Time/.test(element)
          let elementInfo = {
            name: element,
            value: isNeedIndex2 ?
              this.timeTable[index1].time[index2][element] :
              this.timeTable[index1][element],
            index1,
            index2
          }

          this.changeData(elementInfo)
        } else {
          let elementInfo = {
            name: element,
            index1,
            index2
          }

          this.changeData(elementInfo)
        }
        this.timeTable = this.getTimeTable()
      },
      flexTime(orderOfTime) {
        let hour = parseInt(orderOfTime / 2)
        let minute = (orderOfTime % 2) * 30
        return ('0' + hour).slice(-2) + ':' +
          ('00' + minute).slice(-2)
      },
      addTimeRow() {
        this.addTimeDataRow()
        this.timeTable = this.getTimeTable()
      },
      nextPage() {
        this.$emit('next')
      }
    },
    computed: {
      isWidthExtraLarge() {
        return this.windowWidth >= 1200
      },
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
        startTimeArray.splice(this.getSleepTime().endTime, 1)
        endTimeArray.splice(this.getSleepTime().startTime, 1)
        return {
          startTime: startTimeArray,
          endTime: endTimeArray
        }
      },
      dayOption() {
        return Array.apply(null, {length: 7})
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
      }
    },
    components: {
      SleepTime
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    }
  }
</script>

<style scoped>
  .datatable {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  .datatable__sleeptime {
    width: 95%;
    height: 100px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 5px;
    border-bottom: 1px solid gray;
  }
  .datatable__select {
    width: 70px;
  }
  .datatable__wrapper--table {
    width: 100%;
    height: 70%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .datatable__table {
    width: 100%;
  }
  .datatable__wrapper--name {
    width: 30%;
  }
  .datatable__wrapper--day {
    width: 20%;
  }
  .datatable__day {
    width: 60px;
  }
  .datatable__wrapper--time {
    width: 35%;
  }
  .datatable__wrapper--checkbox {
    width: 5%;
  }
  .datatable__checkbox {
    width: 50%
  }
  .datatable__wrapper--button {
    width: 5%;
  }

  .datatable__buttonrow {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }

  .width-fit-content {
    width: fit-content;
  }
</style>