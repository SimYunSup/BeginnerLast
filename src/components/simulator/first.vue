<template>
  <div>
    <b-row
      class="mb-3"
    >
      <b-col
        class="text-center first__title mb-3"
        cols="12"
      >
        나왔다 킹기대
      </b-col>

      <b-col
        class="first__explanation"
        cols="10"
        offset="1"
        lg="8"
        offset-lg="2"
      >
        한국기술교육대는 충청남도 천안시 동남구 병천면 소재의 한 대학교이다.
        <span class="text-line">천안이 절대 아니다.</span>
        <br>
        실천공학기술자 및 인적자원 개발 전문가 양성이라는 목표를 향해 간다는 것을 기반으로
        한기대 2대 적폐인 HRD과목과 현장실습 과목을 계속 유지해 가고 있는 고용노동부 산하 사립대학교이다.
        <br>
        정부 산하라 등록금이 싸며 장학금을 많이 준다고 한다.
        <br>
        뭐 그렇다고.
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
          to="/simulator/2"
        >
          와! 킹기대! 코리아텍!
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
          href="https://www.youtube.com/watch?v=0dWVihVIcB4"
        >
          KOREATECH 아닌가요? (정색)
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
          id="good"
          class="w-100"
          variant="warning"
          @click="clickGood"
        >
          와. 정. 말. 좋. 은. 걸?
        </b-button>
      </b-col>
    </b-row>
    <b-tooltip
      target="good"
      v-show="clicked !== 0"
      placement="bottom"
    >
      진심으로?
      <span v-for="n in clicked" :key="n">?</span>
    </b-tooltip>
  </div>
</template>

<script>
  export default {
    name: "first",
    data() {
      return {
        clicked: 0
      }
    },
    methods: {
      clickGood() {
        this.clicked++
      }
    }
  }
</script>

<style scoped>
  .first__title {
    font-size: 3rem;
    font-weight: bold;
  }
  .first__explanation {
    font-size: 18px;
  }
  @media (min-width: 768px) {
    .first__explanation {
      font-size: 24px;
    }
  }

  .text-line {
    text-decoration-line: line-through;
  }
</style>