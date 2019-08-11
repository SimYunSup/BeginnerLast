<template>
  <div class="main">
    <b-row
      no-gutters
    >
      <b-col
        class="main__title"
        cols="12"
      >
        한기대 시뮬레이터에 오신 것을 환영합니다.
      </b-col>
      <b-col
        class="main__explanation"
        cols="10"
        offset="1"
      >
        <div
          v-for="(row, index) in getExplanation()"
          :key="index"
        >
          {{ row }}
          <br>
        </div>
      </b-col>

      <b-col
        cols="6"
        offset="3"
        md="4"
        offset-md="4"
        class="main__buttonrow"
      >
        <b-button
          class="main__button"
          @click="changeVisitedCondition()"
        >
          네
        </b-button>
        <div
          class="main__divider"
        ></div>
        <b-button
          class="main__button"
        >
          아니오
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
// @ is an alias to /src

export default {
  name: 'mainPage',
  methods: {
    getExplanation() {
      return !this.hasVisited ?
        [
          '한기대 시뮬레이터는 이 홈페이지의',
          '세 가지 기능을 사용하기 위한 튜토리얼입니다.',
          '만약 기능을 사용할 줄 아시면 스킵하셔도 됩니다.',
          '스킵하시겠습니까?'
        ] : [
          '한기대 시뮬레이터는 SKY 보다 KOREATECH에서 재학중인',
          '뉴비가 만든 작품입니다.',
          '솔직히 이거 너무 못 만들어서 갖다 버려도 ㅇㅈ입니다.',
          '한 번 봤으면서 ㅎ 그냥 예 눌러주세요.'
        ]
    },
    ...mapMutations(
      'sharing',
      [
        'changeVisitedCondition'
      ]
    )
  },
  computed: {
    ...mapState(
      'sharing',
      {
        hasVisited: state => state.visited
      }
    )
  }
}
</script>

<style scoped>
  .main {
    height: 90vh;
  }
  .main__title {
    margin-top: 15%;
    font-size: 1.7rem;
    font-weight: bold;
  }
  .main__explanation {
    text-align: center;
  }
  @media (min-width: 768px) {
    .main__title {
      font-size: 2.5rem;
    }
    .main__explanation {
      font-size: 1.5rem;
    }
  }

  .main__buttonrow {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .main__divider {
    border-left: 1.5px black solid;
    width: 1.5px;
    height: 100%;
  }
  .main__button {
    width: 100px;
  }
</style>