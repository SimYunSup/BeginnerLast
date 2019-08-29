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
        cols="10"
        offset="1"
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <!-- FIXME: it doesn't pass props to child component -->
        <daily
          next-link="/simulator/8"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import daily from "../../views/DailyStudyPage";

  export default {
    name: "SeventhDailyStudy",
    methods: {
      next() {
        console.log('a')
        this.$router.replace('/simulator/8')
      }
    },
    components: {
      daily
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