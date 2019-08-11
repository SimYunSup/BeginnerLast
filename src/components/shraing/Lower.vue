<template>
  <b-container
    fluid
  >
    <b-row
      align-v="center"
      class="lower"
    >
      <b-col
        cols="12"
        md="8"
        offset-md="2"
        class="lower__divider"
      />
      <b-col
        cols="12"
        md="10"
        offset-md="1"
      >
        <b-row
          algin-v="center"
          no-gutters
        >
          <b-col
            class="lower__name"
            cols="4"
          >
            <slot name="name">
              Unknown
            </slot>
          </b-col>

          <b-col
            cols="8"
            align-self="center"
          >
            <b-row
              class="lower__content"
            >
              <slot></slot>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: "Lower"
  }
</script>

<style scoped>
  .lower {
    height: 10vh;
  }
  .lower__divider {
    border-top: 1px gray solid;
    height: 1px;
  }

  .lower__name {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.7vw;
    font-weight: bold;
  }
  .lower__content {
    font-size: 2vw;
  }
  @media (min-width: 768px) {
    .lower__name {
      font-size: 28px;
    }
    .lower__content {
      font-size: 15px;
    }
  }

  .lower__relatedpage {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>