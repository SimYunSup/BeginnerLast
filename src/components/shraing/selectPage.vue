<template>
  <div class="selectpage">
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
      }
    }
  }
</script>

<style scoped>
  .selectpage {
    padding-top: 100px;
    height: 85vh;
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

</style>