import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/components/Weather'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/search/:query',
      name: 'Search',
      component: Search
    }
  ]
})
