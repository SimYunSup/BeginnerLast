<template>
  <div
    class="simulator"
  >
    <b-row
      class="mb-3"
      no-gutters
    >
      <b-col
        class="simulator__progresscol"
      >
        <b-button
          variant="outline-secondary"
          class="simulator__progressbutton border-0"
          @click="previous"
        >
          &lt;
        </b-button>
      </b-col>

      <b-col
        class="simulator__progresscol"
        cols="10"
      >
        <b-progress
          class="simulator__progress"
          :max="8"
          :value="nowStep()"
          show-value
          striped
          animated
        />
      </b-col>

      <b-col
        class="simulator__progresscol"
      >
        <b-button
          variant="outline-secondary"
          class="simulator__progressbutton border-0"
          @click="next"
        >
          &gt;
        </b-button>
      </b-col>
    </b-row>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "Simulator",
    methods: {
      next() {
        if(this.nowStep() < 8) {
          this.$router.push('/simulator/' + (this.nowStep() + 1))
        } else
          this.$router.push('/register')
      },
      previous() {
        if(this.nowStep() > 1) {
          this.$router.push('/simulator/' + (this.nowStep() - 1))
        } else
          this.$router.push('/')
      },
      nowStep() {
        return /\d/.exec(this.$route.path) === null
          ? 1
          : Number(/\d/.exec(this.$route.path)[0])
      }
    }
  }
</script>

<style scoped>
  .simulator {
    padding-top: 80px;
    height: 85vh;
  }
  .simulator__progresscol {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
  .simulator__progress {
    width: 100%;
  }
  .simulator__progressbutton {
    height: 100%;
  }
</style>