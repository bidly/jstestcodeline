<template>
  <div id="weather"  :style="{ backgroundImage: 'url(' + image + ')' }">

    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <div
        v-else
      >
        <v-client-table class="table">
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

          <weather v-for="city2 in info[0].consolidated_weather"
                        v-bind:date="city2.applicable_date"
                        v-bind:temp="city2.the_temp"
                        v-bind:max="city2.max_temp"
                        v-bind:min="city2.min_temp"
                        v-bind:ico="'https://www.metaweather.com/static/img/weather/' + city2.weather_state_abbr + '.svg'">

          </weather>
          </tbody>
        </v-client-table>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import './Weather'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

export default {
  name: 'City',
  data () {
    return {
      info: [],
      search: [],
      loading: true,
      errored: false,
      image: '/hero.png'
    }
  },
  methods: {
    /* Same get weather function that used in search and weather vue. to bring the available dates for the related city*/
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
    this.getWeather(this.$route.params.woeid)
  }
}

Vue.component('weather', {
  props: ['date', 'temp', 'max', 'min', 'ico'],
  // language=HTML
  template: '<tr>' +
      ' <td>{{ date }}</td>\n' +
      '        <td>{{ temp }}</td>\n' +
      '        <td>{{ max }}</td>\n' +
      '        <td>{{ min }}</td>\n' +
      '        <td><img :src="ico"></td>\n' +
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
