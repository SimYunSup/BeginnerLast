<template>
  <div
    class="schedulerpage"
  >
    <div
      class="schedulerpage__content"
    >
      <scheduler
        :schedule-data="data"
        class="schedulerpage__scheduler"
      />
      <div
        class="schedulerpage__table"
      >
        <data-table
          :time-data="data"
        />
      </div>
    </div>

    <div
      class="schedulerpage__buttonrow"
    >
      <b-button
        class="schedulerpage__button"
        variant="success"
        @click="addTimeDataRow"
      >
        +
      </b-button>
      <b-button
        class="schedulerpage__button"
        variant="info"
      >
        create daily study
      </b-button>
      <b-button
        class="schedulerpage__button"
        variant="secondary"
      >
        Cancel
      </b-button>
    </div>
  </div>
</template>

<script>
  import scheduler from '@/components/scheduler/Scheduler'
  import dataTable from '@/components/scheduler/DataTable'

  export default {
    name: "SchdulerPage",
    components: {
      scheduler,
      dataTable
    },
    data() {
      return {
        data: [
          {
            name: '선형대수학',
            time: [
              {type: 'fixed', startTime: '09:00', endTime: '11:00', day: 2},
              {type: 'flex', time: '02:00', day: 4}
            ],
            exam: true
          },
          {
            name: 'asdf',
            time: [
              {type: 'fixed', startTime: '09:00', endTime: '13:00', day: 4},
              {type: 'flex', time: '02:00', day: 2}
            ],
            exam: false
          }
        ]
      }
    },
    methods: {
      addTimeDataRow() {
        this.data.push({
          name: '',
          time: [{type: 'fixed', startTime: '', endTime: '', day: null}],
          exam: false
        })
      }
    }
  }
</script>

<style scoped>
  .schedulerpage {
    margin-right: auto;
    margin-left: auto;
    width: 95%;
  }
  .schedulerpage__content {
    height: 90vh;
    padding-top: 100px;
  }

  .schedulerpage__scheduler {
    width: 100%;
    min-width: 550px;
    height: 80%;
  }
  .schedulerpage__table {
    width: 100%;
    height: 20%;
  }
  @media (min-width: 1200px) {
    .schedulerpage__scheduler {
      float: left;
      width: 60%;
      height: 100%;
    }
    .schedulerpage__table {
      float: left;
      width: 40%;
      height: 100%;
    }
  }

  .schedulerpage__buttonrow {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
  .schedulerpage__button {
    width: fit-content;
    margin-right: 5px;
  }
</style>