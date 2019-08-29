<template>
  <div
    class="seventhds"
  >
    <b-row>
      <b-col
        class="text-center seventhds__title mb-3"
        cols="12"
      >
        시간표를 정해봐요!
      </b-col>
      <b-col
        class="seventhds__router"
        cols="12"
      >
        <!-- FIXME: it doesn't pass props to child component -->
        <daily-study-page
          @next="nextPage"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import DailyStudyPage from "../../views/DailyStudyPage";

  export default {
    name: "SeventhDailyStudy",
    methods: {
      nextPage() {
        this.$router.push('/simulator/8')
      }
    },
    components: {
      DailyStudyPage
    }
  }
</script>

<style scoped>
  .seventhds__title {
    font-size: 34px;
    font-weight: bold;
  }
  .seventhds__router {
    width: 100%;
    height: 600px;
  }
</style>