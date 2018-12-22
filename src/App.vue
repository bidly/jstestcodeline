<template>
  <div id="app">
    <h1>Weather App</h1>
      <form @submit="searchResult">
        <label>
          Search:
        </label>
        <input type="search" v-model="search" ref="city" />
        <b-button type="submit">Search</b-button>
      </form>
    <router-view></router-view>
  </div>
</template>

<script>
import BootstrapVue from 'bootstrap-vue'
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
    /* This function routes the user on search to the ../search/keyword */
    searchResult () {
      this.city = this.$refs.city.value
      this.$router.push('/search/' + this.city)
      this.reload()
    }
  },

  mounted () {

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
