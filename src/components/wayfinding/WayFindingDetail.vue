<template>
  <div
    class="px-4"
  >
    <b-row no-gutters>
      <b-col
        cols="5"
        xl="12"
      >
        <div
          class="waydetail__title mb-2"
        >
          {{ placeInfo.name }}
        </div>
        <div
          class="waydetail__explanation mb-3"
        >
          {{ placeInfo.place }}
          {{ placeInfo.floor }}
          {{ placeInfo.placeDetail }}
        </div>
        <div>
          {{ placeInfo.explanation }}
        </div>
      </b-col>
      <b-col
        cols="7"
        xl="12"
      >
        <div
          class="waydetail__map"
        ></div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import place from '@/assets/place.json'

  export default {
    name: "WayFindingDetail",
    props: {
      index: {
        type: Number
      }
    },
    computed: {
      placeInfo() {
        let index = (this.index === null ? this.$route.params.index : this.index)
        return place.place[index]
      }
    },
    mounted() {
      // eslint-disable-next-line no-undef
      kakao.maps.load(function () {
        let element = document.getElementsByClassName('waydetail__map')[0]
        let option = {
          // eslint-disable-next-line no-undef
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        }

        // eslint-disable-next-line no-undef
        new kakao.maps.Map(element, option)
      })
    }
  }
</script>

<style scoped>
  .waydetail__title {
    font-size: 3rem;
    font-weight: bold;
  }
  .waydetail__explanation {
    font-size: 2rem;
  }
  .waydetail__map {
    width: 450px;
    height: 350px;
  }
</style>