export function setItem({commit}, payload) {
    commit('setItem', payload)
}
export function setParams({commit}, payload) {
    commit('setParams', payload)
}
export function clearMessage({commit}) {
    commit('clearMessage')
}