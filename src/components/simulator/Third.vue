<template>
  <div
    class="third"
  >
    <b-row>
      <b-col
        class="text-center third__title mb-3"
        cols="12"
      >
        도착했어요!
      </b-col>

      <b-col
        cols="10"
        offset="1"
        md="8"
        offset-md="2"
      >
        <div
          class="third__roadview"
        ></div>
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
          to="/simulator/4"
        >
          들어가보죠!
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "Third",
    mounted() {
      // eslint-disable-next-line no-undef
      kakao.maps.load(
        () => {
          let container = document.getElementsByClassName('third__roadview')[0]
          // eslint-disable-next-line no-undef
          let roadview = new kakao.maps.Roadview(container, {pan: 180})
          // eslint-disable-next-line no-undef
          let roadviewClient = new kakao.maps.RoadviewClient()

          // eslint-disable-next-line no-undef
          let position = new kakao.maps.LatLng(36.767198, 127.283946)

          roadviewClient.getNearestPanoId(
            position,
            50,
            function(panoId) {roadview.setPanoId(panoId, position)}
          )
        }
      )
    }
  }
</script>

<style scoped>
  .third__title {
    font-size: 40px;
    font-weight: bold;
  }

  .third__roadview {
    width: 100%;
    height: 400px;
  }
</style>