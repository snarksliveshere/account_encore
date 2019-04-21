import Vue from 'vue'
import Vuex from 'vuex'
import state from './state/initialize'
import actions from './actions'
import mutations from './mutations/initialize'
import getters from './getters/initialize'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})