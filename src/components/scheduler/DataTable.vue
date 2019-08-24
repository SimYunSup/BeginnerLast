<template>
  <div
    class="datatable"
  >
    <div
      class="datatable__sleeptime"
      v-if="isWidthExtraLarge"
    >
      <div>
        Your Sleeptime :
      </div>
      <div
        class="datatable__timerow"
      >
        <div
          class="datatable__selectrow"
        >
          <b-form-select
            class="datatable__select border-0"
            size="sm"
            v-model="sleepTime.startTime"
            :options="sleepTimeOption.startTime"
          />
          ~
          <b-form-select
            class="datatable__select border-0"
            size="sm"
            v-model="sleepTime.endTime"
            :options="sleepTimeOption.endTime"
          />
        </div>

        <b-button
          class="datatable__button--apply"
          @click="setSleepTime(sleepTime)"
        >
          Apply
        </b-button>
      </div>
    </div>

    <table
      class="datatable__table"
    >
      <thead>
      <tr
        class="datatable__row"
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
              :class="classArray.input"
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
              :class="classArray.checkbox"
              v-model="timeTable[index1].exam"
              @change="changeElement('exam', index1)"
            />
          </td>

          <td>
            <div
              class="width-fit-content mx-auto"
            >
              <b-form-select
                :class="classArray.select"
                size="sm"
                v-model="timeTable[index1].time[index2].day"
                :options="dayOption"
                :disabled="timeTable[index1].time[index2].type !== 'fixed'"
                @change="changeElement('day', index1, index2)"
              />

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
              :class="classArray.time"
              v-if="timeTable[index1].time[index2].type === 'fixed'"
            >
              <b-form-select
                class="datatable__select border-0"
                size="sm"
                v-model="timeTable[index1].time[index2].startTime"
                :options="fixedTimeOption('start')"
                @change="changeElement('startTime', index1, index2)"
              />
              ~
              <b-form-select
                class="datatable__select border-0"
                size="sm"
                v-model="timeTable[index1].time[index2].endTime"
                :options="fixedTimeOption('end')"
                @change="changeElement('endTime', index1, index2)"
              />
            </div>
            <div
              :class="classArray.time"
              v-else
            >
              {{ timeTable[index1].time[index2].time }}
            </div>
          </td>

          <td>
            <div
              :class="classArray.button"
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
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: "DataTable",
    data() {
      return {
        sleepTime: {
          startTime: this.getSleepTime().startTime,
          endTime: this.getSleepTime().endTime
        },
        windowWidth: window.innerWidth,
        classArray: {
          input: ['border-0'],
          select: [
            'border-0',
            'datatable__day'
          ],
          checkbox: [
            'mx-auto',
            'datatable__checkbox'
          ],
          time: [
            'mx-auto',
            'width-fit-content'
          ],
          button: [
            'mx-auto',
            'width-fit-content'
          ]
        }
      }
    },
    //props를 통해 배열/객체를 가져오는 경우 참조를 전달하므로
    //하위 컴포넌트에서 바꾸는 경우 상위 컴포넌트에 영향을 준다!
    methods: {
      ...mapGetters({
        getSleepTime: 'scheduler/getSleepTime',
        isStartTimeBigger: 'scheduler/isStartTimeBigger',
        times: 'scheduler/getTimeTable',
        orderSleepTime: 'scheduler/getOrderOfSleepTime'
      }),
      ...mapMutations({
        setSleepTime: 'scheduler/setSleepTime',
        changeData: 'scheduler/changePartOfData'
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
          startTime = this.orderSleepTime().endTime
          endTime = this.orderSleepTime().startTime

          for(let i = startTime + (time === 'start' ? 0 : 1);
              i < endTime + (time === 'start' ? 0 : 1);
              i++) {
            let hour = i / 2
            let minute = i % 2
            date.setHours(hour, minute * 30)
            let timeString = new Intl.DateTimeFormat('en-KR', options).format(date)

            timeArray.push(timeString)
          }
        } else {
          startTime = this.orderSleepTime().startTime
          endTime = this.orderSleepTime().endTime

          for(let i = (time === 'start' ? 0 : 1);
              i < 48 + (time === 'start' ? 0 : 1);
              i++) {
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
      isLastFixedTime(indexArray) {
        let index = this.times()[indexArray[0]].time.findIndex(
          (value, index, array) => {
            if(index + 1 === array.length) {
              return false
            }
            return array[index + 1].type === 'flex'
          }
        )

        return index === -1 ?
          indexArray[2] === this.times()[indexArray[0]].time.length :
          index === indexArray[1]
      },
      changeElement(element, index1, index2) {
        const orderOfTime = (string) => {
          return Number(string.slice(0, 2)) * 2
            + (string[3] === '0' ? 0 : 1)
        }

        if(/Time/.test(element)) {
          let startTime = orderOfTime(this.times()[index1].time[index2].startTime)
          let endTime = orderOfTime(this.times()[index1].time[index2].endTime)

          if(element === 'startTime') {
            let sleepEndTime = orderOfTime(this.getSleepTime().endTime)
            if((startTime < sleepEndTime && endTime > sleepEndTime)
              ||  startTime >= endTime) {
              alert('Time Scope Error. Enter Right Scope.')
              console.log(startTime < sleepEndTime)
              console.log(endTime > sleepEndTime)
              console.log(startTime <= endTime)
              return false
            }
          } else if(element === 'endTime') {
            let sleepStartTime = orderOfTime(this.getSleepTime().startTime)

            if((startTime < sleepStartTime && endTime > sleepStartTime)
              || startTime >= endTime) {
              alert('Time Scope Error. Enter Right Scope.')
              return false
            }
          }
        }

        if(/Row/.test(element)) {
          let isNeedIndex2 = /day|Time/.test(element)
          let elementInfo = {
            name: element,
            value: isNeedIndex2 ?
              this.times()[index1][element] :
              this.times()[index1].time[index2][element],
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

          timeArray.push({value: timeString, text: timeString})
        }
        let startTimeArray = [].concat(timeArray)
        let endTimeArray = [].concat(timeArray)
        startTimeArray.splice(this.orderSleepTime().endTime, 1)
        endTimeArray.splice(this.orderSleepTime().startTime, 1)
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
      },
      ...mapGetters({
        timeTable: 'scheduler/getTimeTable'
      })
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
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .datatable__sleeptime {
    width: 95%;
    height: 70px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 5px;
    border-bottom: 1px solid gray;
  }
  .datatable__timerow {
    display: flex;
    flex-direction: row;
  }

  .datatable__selectrow {
    margin: 0;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .datatable__select {
    width: 70px;
  }
  .datatable__button--apply {
    width: 20%;
    float: right;
  }

  .datatable__table {
    width: 100%;
  }
  .datatable__row {
    border-bottom: 1px solid dimgray;
    text-align: center;
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

  .width-fit-content {
    width: fit-content;
  }
</style>