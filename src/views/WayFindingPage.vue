<template>
  <b-container
    class="wayfinding"
    :fluid="!isWidthExtraLarge"
  >
    <b-row
      no-gutters
    >
      <b-col
        class="wayfinding__col pr-xl-3"
        cols="12"
        xl="7"
      >
        <b-input
          class="mb-3"
          v-model="searchString"
          placeholder="Write What You Want To Find.."
        />
        <b-table
          class="wayfinding__table"
          head-variant="light"
          selectable
          select-mode="single"
          selected-variant="primary"
          @row-selected="showDetail"
          :filter="searchString"
          :items="placeArray"
          :fields="fields"
          responsive
          sticky-header
        ></b-table>
      </b-col>
      <b-col
        class="wayfinding__col"
        cols="12"
        xl="5"
      >
        <router-view/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import place from "@/assets/place.json"

  export default {
    name: "WayFindingPage",
    data() {
      return {
        searchString: '',
        fields: [
          {key: 'name', label:'Room Name', class:'text-center'},
          {key: 'place', label:'Building Name', class:'text-center'}
        ],
        windowWidth: window.innerWidth
      }
    },
    methods: {
      showDetail(items) {
        if(items.length === 0)
          this.$router.push('/wayfinding')
        else {
          let index = place.place.findIndex(
            (value) => {
              return value.name === items[0].name
            }
          )
          let address = '/wayfinding/' + index

          if(address !== this.$route.path)
            this.$router.push('/wayfinding/' + index)
        }
      }
    },
    computed: {
      isWidthExtraLarge() {
        return this.windowWidth >= 1200
      },
      placeArray() {
        return place.place
      }
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    }
  }
</script>

<style scoped>
  .wayfinding {
    padding-top: 100px;
    margin-bottom: 50px;
  }
  .wayfinding__col {
    height: 100%;
  }
  .wayfinding__table {
    max-height: 330px;
  }
  @media (min-width: 1200px) {
    .wayfinding__table {
      max-height: 600px;
    }
  }
</style>