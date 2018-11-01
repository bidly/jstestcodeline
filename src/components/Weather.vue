<template>
  <div id="weather">
    <h1>Weather App</h1>

    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
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

          <show-weather v-for="city in info"
                        v-bind:title="city.title"
                        v-bind:temp="city.consolidated_weather[0].the_temp"
                        v-bind:max="city.consolidated_weather[0].max_temp"
                        v-bind:min="city.consolidated_weather[0].min_temp"
                        v-bind:ico="city.consolidated_weather[0].max_temp">

          </show-weather>
          </tbody>
        </table>

      </div>

    </section>
  </div>
</template>
n
<script>
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'Weather',
  data () {
    return {
      info: [],
      search: [],
      loading: true,
      errored: false,
      cities: [2344116, 565346, 560743, 638242, 44418, 9807] // city codes for home page
    }
  },
  methods: {
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
    this.cities.forEach((item) => {
      this.getWeather(item)
    })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
