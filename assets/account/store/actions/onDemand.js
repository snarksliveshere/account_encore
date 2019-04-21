export function sendCUDRequest(context, payload) {
    context.commit('setLoading', true)
    return new Promise((resolve, reject) => {
        context.getters.getHTTP.post(payload.url, {
            data: payload.data
        }).then(response => {
            return response.json()
        }).then(editedData => {
            if (editedData instanceof Object) {
                context.commit('setMessage', editedData)
                resolve(editedData)
            }
        })
            .then((result) => {
                context.commit('setLoading', false)
                return result
            }, (v) => {
                if (v.status === 500) {
                    context.commit('setMessage', context.state.messages.error500)
                }
            })
    })
}
export function sendRequestFilterData(context, payload) {
    context.state.data = []
    context.commit('setLoading', true)
    context.state.http.post(payload.url, {
        search: payload.data,
        date: payload.date
    }).then(response => {
        return response.json();
    }).then(outerData => {
        if (outerData.error) {
            console.log(outerData.error);
            return context.commit('setMessage', outerData.error)
        }
        context.state.data = outerData.data
        context.commit('setMessage', context.state.messages.filterSuccess)
        context.commit('setDataTableActionsStatus', true)
    })
        .then(() => context.commit('setLoading', false), (v) => {
            if (v.status === 500) {
                context.commit('setMessage', context.state.messages.error500)
            }
        })
}
export function getRequiredData(context, payload) {
    return new Promise((resolve, reject) => {
        context.getters.getHTTP.get(payload.url, {}).then(response => {
            return response.json()
        })
            .then(editedData => {
                if (editedData instanceof Object) {
                    context.state.requiredData[payload.key] = editedData
                    resolve(editedData)
                }
            })
            .then((v) => v,
                (v) => {
                    if (v.status === 500) {
                        context.commit('setMessage', context.state.messages.error500)
                    }
                }
            )
    })
}
export function getDataByParam(context, payload) {
    context.commit('setLoading', true)
    return new Promise((resolve, reject) => {
        context.getters.getHTTP.post(payload.url, {
            search: payload.data
        }).then(response => {
            return response.json()
        }).then(editedData => {
            if (editedData instanceof Object) {
                resolve(editedData)
            }
        })
            .then((v) => {
                context.commit('setLoading', false)
                return v
            }, (v) => {
                if (v.status == 500) {
                    context.commit('setMessage', context.state.messages.error500)
                }
            })
    })
}


export function getCsvResponse(context, payload) {
    context.commit('setLoading', true)
    return new Promise((resolve, reject) => {
        context.getters.getHTTP.post(payload.url, {
            search: payload.data
        }).then(response => {
            context.commit('setLoading', false)
            let v = response.body
            return v
        })
    })
}

export function getGroupDataByParam(context, payload) {
    context.commit('setLoading', true)
    return new Promise((resolve, reject) => {
        context.getters.getHTTP.post(payload.url, {
            search: payload.data
        })
            .then(response => {
                return response.json()
            })
            .then(result => {
                context.commit('cleanIntroduction')
                return result
            })
            .then(outerData => {
                context.commit('setData', outerData.data)
                context.dispatch('fillingComplementaryData', {
                    data: outerData
                })
                context.commit('setFiltersData', outerData.filtersData)
                // if (outerData.hasOwnProperty('error')) {
                //     return context.commit('setMessage', outerData)
                // }
                return outerData
            })
            .then((data) => {
                context.commit('setLoading', false)
                resolve (data)
            }, (v) => {
                if (v.status === 500) {
                    context.commit('setMessage', context.state.messages.error500)
                }
            })
    })
}