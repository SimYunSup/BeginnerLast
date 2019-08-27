<template>
  <select-page
    type="simple"
    title="이번 학기 시간표를 짜기 전에..."
  >
    <template
      #explanation
      v-if="loadScheduler"
    >
      우리는 시간표를 짜기 전에 정해야 할 것이 있습니다.
      <br>
      잠 자는 시간을 정하고 그것에 맞추어서 시간표를 정해야 하기에
      <br>
      잠 자는 시간을 정해야 합니다.
      <br>
      당신은 규칙적인 생활을 하기 때문에
      <br>
      요일마다 다르게 자는 것은 혀용하지 않습니다.
      <br>
      <br>
      요일마다 다르게 잔다구요? 아.. 네.. 뭐 알아서 하세요 ^^
    </template>
    <template
      #explanation
      v-else
    >
      시간표를 변경하기 전에 잘 시간을 정해주세요.
    </template>
    <template #default>
      <b-row>
        <b-col
          class="border-top py-3"
          cols="8"
          offset="2"
          lg="6"
          offset-lg="3"
        >
          Your Sleeptime :
        </b-col>
      </b-row>

      <b-row>
        <b-col
          cols="8"
          offset="2"
          md="6"
          offset-md="3"
        >
          <b-row
            class="justify-content-center"
            no-gutters
          >
            <b-col
              cols="2"
            >
              <b-form-select
                class="beforeschedule__select"
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
                class="beforeschedule__select"
                size="sm"
                v-model="sleepTime.endTime"
                :options="sleepTimeOption.endTime"
              />
            </b-col>
            <b-col
              cols="2"
            >
              <b-button
                class="beforeschedule__button mx-4"
                variant="info"
                @click="pushScheduler"
              >
                Apply
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

    </template>
  </select-page>
</template>

<script>
  import selectPage from "../components/shraing/selectPage";
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: "BeforeSchedulePage",
    props: {
      link: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        sleepTime: {
          startTime: this.getSleepTime().startTime,
          endTime: this.getSleepTime().endTime
        }
      }
    },
    methods: {
      ...mapGetters({
        getSleepTime: 'scheduler/getSleepTime'
      }),
      ...mapMutations({
        setSleepTime: 'scheduler/setSleepTime',
        changeData: 'scheduler/changePartOfData'
      }),
      ...mapActions({
        loadScheduler: 'scheduler/loadData'
      }),
      pushScheduler() {
        this.setSleepTime(this.sleepTime)
        this.$router.push(this.link)
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
    },
    components: {
      selectPage
    },
    async created() {
      await this.loadData
    }
  }
</script>

<style scoped>
  .beforeschedule__select {
    height: 100%;
  }
  .beforeschedule__button {
    height: 100%;
    width: 100px;
  }
</style>