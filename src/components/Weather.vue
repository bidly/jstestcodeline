<template>
  <div>

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
          <weather v-for="city in info"
                        v-bind:title="city.title"
                        v-bind:temp="city.consolidated_weather[0].the_temp"
                        v-bind:max="city.consolidated_weather[0].max_temp"
                        v-bind:min="city.consolidated_weather[0].min_temp"
                        v-bind:woeid="'http://localhost:8080/#/weather/' + city.woeid"
                        v-bind:ico="'https://www.metaweather.com/static/img/weather/' + city.consolidated_weather[0].weather_state_abbr + '.svg'">

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

/* Opening page, which brings the 6 default cities temperatures and other requested values*/
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
  /* Get weather method requests the json of the sent woeid (in this case, it is one of the woeid's above */
  methods: {
    getWeather (woeid) {
      axios
        .get(`http://localhost/jstestcodeline/weather.php?command=location&woeid=${woeid}/`)
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
  beforeMount () {
    this.cities.forEach((item) => {
      this.getWeather(item)
    })
  },

  components: {
    'weather': weather
  }
}
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
