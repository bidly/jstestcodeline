import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/components/Weather'
import Search from '@/components/Search'
import City from '@/components/City'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/', redirect: '/weather'
    },
    {
      path: '/search/:query',
      name: 'Search',
      component: Search
    },
    {
      path: '/weather/:woeid',
      name: 'Weather',
      component: City
    }
  ]
})
