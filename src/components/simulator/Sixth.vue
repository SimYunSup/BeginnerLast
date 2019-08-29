<template>
  <div
    class="sixth"
  >
    <b-row>
      <b-col
        v-for="text in title"
        :key="text"
        class="text-center sixth__title mb-3"
        cols="12"
      >
        {{ text }}
      </b-col>

      <b-col
        class="my-4"
        cols="6"
        offset="3"
        md="4"
        offset-md="4"
        v-if="!showButtonRow"
      >
        <b-button
          class="w-100"
          variant="warning"
          @click="changeButtonText"
        >
          {{ buttonText }}
        </b-button>
      </b-col>
      <b-col
        class="my-4"
        cols="6"
        offset="3"
        md="4"
        offset-md="4"
        v-else
      >
        <b-button
          class="w-100 mb-4"
          variant="danger"
          @click="reset"
        >
          벼락치기를 한다
        </b-button>

        <b-button
          class="w-100 mb-2"
          variant="success"
          @click="changeNavbar('scheduler')"
          to="/simulator/7"
        >
          매주 복습을 한다.
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: "Sixth",
    data() {
      return {
        count: 0,
        title: ['이런, 또 큰일났어요!'],
        buttonText: '아니 또 왜요?',
        showButtonRow: false,
        hasTried: false
      }
    },
    methods: {
      ...mapMutations({
        changeNavbar: 'sharing/changeNavbar'
      }),
      changeButtonText() {
        switch (++this.count) {
          case 1:
            this.title.push('시험이 다가와요!')
            this.buttonText = this.hasTried
              ? '아니 왜 그러는데 진짜'
              : '아니 벌써 준비한다구요?'
            break
          case 2:
            this.title.push('어떻게 하죠?')
            this.buttonText = '아니 왜 물어보는데 정해져있잖아'
            break
          case 3:
            this.title.push('이번엔 당신의 성향을 알아보고 해보죠!')
            this.buttonText = this.hasTried
              ? '아 알겠어 알겠다고'
              : '뭘;'
            break
          case 4:
            this.showButtonRow = true
            this.hasTried = true
        }
      },
      reset() {
        this.count = 0
        this.title = ['이런, 또 큰일났어요!']
        this.showButtonRow = false
      }
    }
  }
</script>

<style scoped>
  .sixth__title {
    font-size: 40px;
    font-weight: bold;
  }
</style>