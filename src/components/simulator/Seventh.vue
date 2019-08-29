<template>
  <div
    class="sevenths"
  >
    <b-row>
      <b-col
        class="text-center sevenths__title mb-3"
        cols="12"
      >
        먼저 자는 시간을 정해봐요!
      </b-col>
      <b-col
        class="sevenths__router"
        cols="10"
        offset="1"
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <sleep-time
          :next-link="link"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import SleepTime from "../scheduler/SleepTime";

  export default {
    name: "seventhSleepTime",
    data() {
      return {
        link: '/simulator/7/data'
      }
    },
    components: {
      SleepTime
    }
  }
</script>

<style scoped>
  .sevenths__title {
    font-size: 34px;
    font-weight: bold;
  }
  .sevenths__router {
    width: 100%;
    height: 400px;
  }
</style>