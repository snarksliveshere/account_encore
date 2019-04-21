import Vue from 'vue'
import App from './App'
import router from 'vue-router'
import Vuetify from 'vuetify'
import lodash from 'lodash'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'
import 'vuetify/dist/vuetify.min.css'
import store from './store'

Vue.use(Vuetify, {
    theme: {
        primary: '#37c1b0',
        secondary: '#e57373',
        accent: '#EF5350',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#2196f3',
        success: '#2b9415'
    }
})
Vue.use(VueResource);
Object.defineProperty(Vue.prototype, '_', {value: lodash})
window.App = App;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})