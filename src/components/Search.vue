<template>
  <div id="search">

    <section v-if="errored">
      <p>We're sorry, no result were found, please try another keyword</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <div
        v-else
      >
        <table class="table">
          <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Max</th>
            <th>Min</th>
            <th>Ico</th>
          </tr>
          </thead>
          <tbody>

          <weather v-for="city in info"
                        v-bind:title="city.title"
                        v-bind:temp="city.consolidated_weather[0].the_temp"
                        v-bind:max="city.consolidated_weather[0].max_temp"
                        v-bind:min="city.consolidated_weather[0].min_temp"
                        v-bind:woeid="'http://localhost:8080/#/weather/' + city.woeid"
                        v-bind:ico="'https://www.metaweather.com/static/img/weather/' +
                         city.consolidated_weather[0].weather_state_abbr + '.svg'">

          </weather>
          </tbody>
        </table>

      </div>

    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'

const weather = {
  props: ['title', 'temp', 'max', 'min', 'woeid', 'ico'],
  template: '<tr>' +
    ' <td>' +
    '  <a :href="woeid">' +
    '{{ title }}</td>\n' +
    '        <td>{{ temp }}</td>\n' +
    '        <td>{{ max }}</td>\n' +
    '        <td>{{ min }}</td>\n' +
    '        <td><img :src="ico"></td>\n' +
    '</tr>'
}


export default {
  name: 'Search',
  data () {
    return {
      keyword: this.$route.params,
      search: [],
      search2: [15, 20],
      info: [],
      loading: true,
      errored: false,
      city: ''
    }
  },
  components: {
    weather: weather
  },
  watch: {
    '$route': 'searchResult'
  },
  methods: {
    /* Search function, this query bring the search result for the sent keyword which takes place on URL */
    searchResult () {
      this.city = this.$route.params.query
      this.info = []
      axios
        .get(`http://localhost/jstestcodeline/weather.php?command=search&keyword=${this.city}`)
        .then(response => (response.data.forEach((t) => {
          this.getWeather(t.woeid)
        })), error => {
          console.error(error)
        })
        .catch(e => {
          this.errored = true
        })
        .finally(() => this.loading = false)

    },
    /* Get Weather function again, to bring the weather of the found cities from the query */
    getWeather (woeid) {
      axios
        .get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
        .then(response => (this.info.push(response.data)), error => {
          console.error(error)
        })
        .catch(e => {
          this.info = e
          this.errored = true
        })
        .finally(() => this.loading = false)
    }
  },
  mounted () {
    this.searchResult()
  }
}
Vue.component('show-weather', {
  props: ['title', 'temp', 'max', 'min', 'ico'],
  template: '<tr>' +
    ' <td>{{ title }}</td>\n' +
    '        <td>{{ temp }}</td>\n' +
    '        <td>{{ max }}</td>\n' +
    '        <td>{{ min }}</td>\n' +
    '        <td>{{ ico }}</td>\n' +
    '</tr>'
})

</script>

<style scoped>

</style>
