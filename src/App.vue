<template>
  <div id="app">
    <label>
      Search:
      <input type="search" v-model="search" ref="city" />
    </label>
    <button @click="searchResult">Search</button>
    <router-view/>

  </div>
</template>

<script>
  import BootstrapVue from 'bootstrap-vue'
  import axios from 'axios'
  import Vue from 'vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  Vue.use(BootstrapVue)

export default {
  name: 'App',
  data() {
    return {
      user: {
        search: ''
      }
    }
  },
  methods: {
    searchResult (city) {
      this.city = this.$refs.city.value
      axios
        .get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/search/?query=${city}/`)
        .then(response => (this.search.push(response.data)))
        .catch(e => {
          this.info = e
          this.errored = true
        })
        .finally(() => this.loading = false)
      this.$router.push('/search/' + this.city)
    }
  },

  mounted () {
    this.cities.forEach((item) => {
      this.searchResult(item)
    })
  }
}

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
