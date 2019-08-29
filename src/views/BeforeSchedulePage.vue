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
          cols="8"
          offset="2"
          lg="6"
          offset-lg="3"
        >
          <sleep-time
            :next-link="link"
          />
        </b-col>
      </b-row>
    </template>
  </select-page>
</template>

<script>
  import { mapActions } from 'vuex'
  import selectPage from "../components/shraing/selectPage";
  import SleepTime from "../components/scheduler/SleepTime";

  export default {
    name: "BeforeSchedulePage",
    props: {
      link: {
        type: String,
        required: true
      }
    },
    methods: {
      ...mapActions({
        loadScheduler: 'scheduler/loadData'
      })
    },
    components: {
      selectPage,
      SleepTime
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