<template>
  <div
    class="eighth"
  >
    <b-row>
      <b-col
        class="text-center eighth__title mb-3"
        cols="12"
      >
        이제 시간표가 완성되었으니 열심히 공부하세요!
      </b-col>

      <b-col
        cols="10"
        offset="1"
        md="6"
        offset-md="3"
      >
        <scheduler
          class="eighth__table"
        />
      </b-col>

      <b-col
        class="my-4"
        cols="6"
        offset="3"
        md="4"
        offset-md="4"
      >
        <b-button
          class="w-100"
          variant="warning"
          @click="changeNavbar('developer')"
          to="/register"
        >
          이제 무얼 해야 하나요?
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Scheduler from "../scheduler/Scheduler";
  import { mapMutations } from 'vuex'

  export default {
    name: "Eighth",
    methods: {
      ...mapMutations({
        changeNavbar: 'sharing/changeNavbar'
      })
    },
    components: {
      Scheduler
    }
  }
</script>

<style scoped>
  .eighth__title {
    font-size: 40px;
    font-weight: bold;
  }
  .eighth__table {
    height: 400px;
  }
</style>