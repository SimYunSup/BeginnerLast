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
        <data-table
          :next-link="nextLink"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import scheduler from '@/components/scheduler/Scheduler'
  import dataTable from '@/components/scheduler/DataTable'
  import { mapActions } from 'vuex'

  export default {
    name: "SchdulerPage",
    props: {
      nextLink: {
        type: String,
        required: true
      }
    },
    components: {
      scheduler,
      dataTable
    },
    methods: {
      ...mapActions({
        loadData: 'scheduler/loadData'
      })
    },
    async created() {
      await this.loadData
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
    overflow-y: scroll;
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
</style>