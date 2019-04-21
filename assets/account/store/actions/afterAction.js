export function removeDeletedRow(context, payload) {
    context.state.data = _.reject(context.state.data, v => {
        return v[payload.indexId] == payload.id
    })
}
export function insertUpdatedRow(context, payload) {
    return new Promise(resolve => {
        let data = _.each(context.state.data, (value, key) => {
            if (value[payload.indexId] == payload.data[payload.indexId]) {
                return context.state.data[key] = payload.data
            }
        })
        resolve(data)
    }).then((data) => {
        data.push({})
        context.commit('setData', data)
        data.pop()
        context.commit('setData', data)
    })
}
export function insertNewRows(context, payload) {
    context.commit('setLoading', true)
    context.dispatch('getDataByParam', {
        url: payload.url,
        data: payload.data
    })
        .then(result => {
            _.each(result.data, v => context.commit('pushData', v))
            context.commit('setLoading', false)
            return data
        })
        .then(result => {
            context.commit('setMessage', context.state.messages.successAction)
            return result
        }, (error) => {
            if (error.status === 500) {
                context.commit('setMessage', context.state.messages.error500)
            }
        })
}