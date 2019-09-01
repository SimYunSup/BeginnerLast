<template>
  <div
    class="fifth"
  >
    <b-row>
      <b-col
        class="text-center fifth__title mb-3"
        cols="12"
      >
        검색을 통해 찾아보죠!
      </b-col>

      <b-col
        cols="10"
        offset="1"
        md="6"
        offset-md="3"
      >
        <b-input
          class="mb-3"
          :value="inputData"
          placeholder="학생회관"
          @blur="changeInput"
        />
      </b-col>
      <b-col
        cols="10"
        offset="1"
        xl="6"
        offset-xl="3"
        v-if="this.inputData === '학생회관'"
      >
        <way-finding-detail
          :index="3"
        />
      </b-col>

      <b-col
        cols="6"
        offset="3"
        md="4"
        offset-md="4"
        v-if="this.inputData === '학생회관'"
      >
        <b-button
          class="w-100"
          variant="warning"
          to="/simulator/6"
        >
          ..네 대단하네요
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import WayFindingDetail from "../wayfinding/WayFindingDetail";

  export default {
    name: "Fifth",
    data() {
      return {
        inputData: null,
        showData: false
      }
    },
    methods: {
      changeInput() {
        this.inputData = '학생회관'
      }
    },
    components: {
      WayFindingDetail
    }
  }
</script>

<style scoped>
  .fifth__title {
    font-size: 50px;
    font-weight: bold;
  }
</style>