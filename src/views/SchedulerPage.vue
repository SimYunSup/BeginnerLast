<template>
  <div
    class="schedulerpage"
  >
    <div
      class="schedulerpage__content"
    >
      <scheduler
        class="schedulerpage__scheduler"
      />
      <div
        class="schedulerpage__table"
      >
        <data-table/>
      </div>
    </div>
    <div
      class="schedulerpage__buttonrow"
    >
      <b-button
        class="schedulerpage__button"
        variant="success"
        @click="addRow"
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
        variant="primary"
        @click="saveData"
      >
        Save
      </b-button>
      <b-button
        class="schedulerpage__button"
        variant="danger"
        @click="resetData"
      >
        Reset
      </b-button>
    </div>
  </div>
</template>

<script>
  import scheduler from '@/components/scheduler/Scheduler'
  import dataTable from '@/components/scheduler/DataTable'
  import { mapMutations, mapActions } from 'vuex'

  export default {
    name: "SchdulerPage",
    components: {
      scheduler,
      dataTable
    },
    methods: {
      ...mapMutations({
        addRow: 'scheduler/addTimeDataRow'
      }),
      ...mapActions({
        saveData: 'scheduler/addData',
        resetData: 'scheduler/removeData'
      })
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