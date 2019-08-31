<template>
  <div
    class="second"
  >
    <b-row
      class="justify-content-center"
    >
      <b-col
        class="text-center"
        cols="10"
        md="8"
        lg="6"
      >
        <div
          class="second__map"
        ></div>
        <div
          class="second__text"
        >
          한기대는 천안에서 1시간 거리
          <span class="text-line">오지</span>
          에 있습니다
          <br>
          우리는 어떻게 가야 할까요?
        </div>
      </b-col>
    </b-row>

    <b-row
      class="mt-3"
    >
      <b-col
        class="my-3"
        cols="6"
        offset="3"
        md="4"
        offset-md="4"
      >
        <b-button
          class="w-100"
          variant="warning"
          target="_blank"
          href="https://koreatech.in/bus"
          @click="nextPage"
        >
          버스로
        </b-button>
      </b-col>
      <b-col
        class="my-3"
        cols="6"
        offset="3"
        md="4"
        offset-md="4"
      >
        <b-button
          class="w-100"
          variant="warning"
          @click="toast"
        >
          차로
        </b-button>
      </b-col>
      <b-col
        class="my-3"
        cols="6"
        offset="3"
        md="4"
        offset-md="4"
      >
        <b-button
          id="walking"
          class="w-100"
          variant="warning"
        >
          걸어서
        </b-button>
      </b-col>
    </b-row>

    <b-popover
      target="walking"
      triggers="hover focus"
      placement="rightbottom"
    >
      <template slot="title">미침?</template>
      미쳤습니까 <strong>휴먼</strong>?
    </b-popover>
  </div>
</template>

<script>
  import searchLocation from "../../service/mapapi";

  export default {
    name: "Second",
    methods: {
      toast() {
        this.$bvToast.toast('부자시네요. 밥 좀 사주세요.', {
          title: `윤섭이는 배가 고파요`,
          variant: 'warning',
          solid: false,
          autoHideDelay: 3000
        })
      },
      nextPage() {
        this.$router.push('/simulator/3')
      }
    },
    mounted() {
      // eslint-disable-next-line no-undef
      searchLocation('한국기술교육대학교 제1캠퍼스')
        .then(
          value => {
            // eslint-disable-next-line no-undef
            kakao.maps.load(
              () => {
                let element = document.getElementsByClassName('second__map')[0]

                let option = {
                  // eslint-disable-next-line no-undef
                  center: new kakao.maps.LatLng(value.y, value.x),
                  level: 5
                }

                // eslint-disable-next-line no-undef
                let map = new kakao.maps.Map(element, option)
                // eslint-disable-next-line no-undef
                let markerPosition  = new kakao.maps.LatLng(value.y, value.x);

                // eslint-disable-next-line no-undef
                let marker = new kakao.maps.Marker({
                  position: markerPosition
                });

                marker.setMap(map);

                let iwContent = '<div style="padding:5px;">\
                   한기대\
                  </div>'
                // eslint-disable-next-line no-undef
                let iwPosition = new kakao.maps.LatLng(value.y, value.x);

                // eslint-disable-next-line no-undef
                let infowindow = new kakao.maps.InfoWindow({
                  position : iwPosition,
                  content : iwContent
                });

                infowindow.open(map, marker);
              }
            )
          }
        )
    }
  }
</script>

<style scoped>
  .second__map {
    width: 100%;
    height: 400px;
  }
  .second__text {
    font-size: 18px;
  }

  .text-line {
    text-decoration-line: line-through;
  }
</style>