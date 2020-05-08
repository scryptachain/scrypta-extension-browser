import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import GravatarImg from './components/VueGravatar.vue';

Vue.use(VueRouter)
Vue.component('v-gravatar', GravatarImg);

export default new VueRouter({
  routes
})
