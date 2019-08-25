<template>
  <div class="selectpage">
    <b-row
      no-gutters
      v-if="type === 'progress'"
    >
      <b-col
        class="selectpage__progresscol"
      >
        <b-button
          variant="outline-secondary"
          class="selectpage__progressbutton"
          @click="previousProgress"
        >
          &lt;
        </b-button>
      </b-col>

      <b-col
        class="selectpage__progresscol"
        cols="10"
      >
        <b-progress
          class="selectpage__progress"
          :max="progress.max"
          :value="progress.value"
          show-value
          striped
          animated
        />
      </b-col>

      <b-col
        class="selectpage__progresscol"
      >
        <b-button
          variant="outline-secondary"
          class="selectpage__progressbutton"
          @click="nextProgress"
        >
          &gt;
        </b-button>
      </b-col>
    </b-row>

    <b-row
      no-gutters
    >
      <b-col
        class="selectpage__title"
        cols="10"
        offset="1"
      >
        {{title}}
      </b-col>
      <b-col
        class="selectpage__explanation"
        cols="10"
        offset="1"
      >
        <slot name="explanation"></slot>
      </b-col>
    </b-row>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "selectPage",
    props: {
      type: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      progress: {
        type: Object
      }
    },
    methods: {
      previousProgress() {
        this.$emit('previous')
      },
      nextProgress() {
        this.$emit('next')
      }
    }
  }
</script>

<style scoped>
  .selectpage {
    padding-top: 100px;
    height: 90vh;
  }
  .selectpage__title {
    font-size: 1.7rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 50px;
  }
  .selectpage__explanation {
    text-align: center;
    margin-bottom: 30px;
    height: 300px;
  }
  @media (min-width: 768px) {
    .selectpage__title {
      font-size: 2.5rem;
    }
    .selectpage__explanation {
      font-size: 1.2rem;
    }
  }

  .selectpage__progresscol {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
  }
  .selectpage__progress {
    width: 100%;
  }
  .selectpage__progressbutton {
    height: 100%;
  }

</style>