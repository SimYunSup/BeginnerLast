<template>
  <div
    class="fourth"
  >
    <transition-group
      name="list"
      tag="b-row"
    >
      <b-col
        v-for="text in title"
        :key="text"
        class="text-center fourth__title mb-3"
        cols="12"
      >
        {{ text }}
      </b-col>
    </transition-group>

    <b-row>
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
          @click="changeButtonText"
        >
          {{ buttonText }}
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: "Fourth",
    data() {
      return {
        count: 0,
        title: ['이런, 큰일났어요!'],
        buttonText: '왜요?'
      }
    },
    methods: {
      ...mapMutations({
        changeNavbar: 'sharing/changeNavbar'
      }),
      changeButtonText() {
        switch (++this.count) {
          case 1:
            this.title.push('학생회관이 어디있는지 모르겠어요!')
            this.buttonText = '당신이 아싸라 그런거 아닌가요?'
            break
          case 2:
            this.title.push('어떻게 하죠?')
            this.buttonText = '야 너 아싸지'
            break
          case 3:
            this.title.push('아! 검색을 하면 될 것 같아요!')
            this.buttonText = '하..'
            break
          case 4:
            this.changeNavbar('wayfinding')
            this.$router.push('/simulator/5')
        }
      }
    }
  }
</script>

<style scoped>
  .fourth__title {
    font-size: 40px;
    font-weight: bold;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>