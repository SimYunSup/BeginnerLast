<template>
  <div
    class="schedulerpage"
  >
    <div
      class="schedulerpage__content"
    >
      <div
        class="schedulerpage__scheduler"
      >
        <scheduler/>
      </div>

      <div
        class="schedulerpage__table"
      >
        <data-table
          @next="next"
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
    components: {
      scheduler,
      dataTable
    },
    methods: {
      ...mapActions({
        loadData: 'scheduler/loadData'
      }),
      next() {
        this.$emit('next')
      }
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
    overflow-y: scroll;
    overflow-x: scroll;
    width: 100%;
    min-width: 550px;
    height: 80%;
  }
  .schedulerpage__table {
    overflow-y: auto;
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