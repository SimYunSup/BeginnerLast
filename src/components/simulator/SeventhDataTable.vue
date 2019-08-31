<template>
  <div
    class="seventhd"
  >
    <b-row>
      <b-col
        class="text-center seventhd__title mb-3"
        cols="12"
      >
        시간표를 정해봐요!
      </b-col>
      <b-col
        class="seventhd__router"
        cols="10"
        offset="1"
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <data-table
          @next="next"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import DataTable from "../scheduler/DataTable";
  export default {
    name: "SeventhDataTable",
    methods: {
      next() {
        this.$router.push('/simulator/7/daily')
      }
    },
    components: {
      DataTable
    }
  }
</script>

<style scoped>
  .seventhd__title {
    font-size: 34px;
    font-weight: bold;
  }
  .seventhd__router {
    width: 100%;
    height: 600px;
  }
</style>