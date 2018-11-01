<template>

  <div id="aaat">
    <p>
      <router-link to="/user/foo">/user/foo</router-link>
      <router-link to="/user/bar">/{{query}}</router-link>
    </p>
    <router-view></router-view>
  </div>

</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  import Weather from './Weather'
  import VueRouter from 'vue-router'


export default {
  name: 'Search',
  data () {
    return {
      info: Weather.data().info,
      keyword: this.$route.params,
      search: [],
      loading: true,
      errored: false,
      query: this.$router.push(),
      cities: [2344116, 565346, 560743, 638242, 44418, 9807] // city codes for home page
    }
  }
}
</script>

<style scoped>

</style>
