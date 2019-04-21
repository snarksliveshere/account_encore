export function initialize(context) {
    context.state.data = []
    context.commit('setLoading', true)

    return new Promise((resolve, reject) => {
        context.state.http.get(context.state.url.data, {}).then(response => {
            return response.json()
        })
            .then(result => {
                context.commit('cleanIntroduction')
                return result
            })
            .then(outerData => {
                if (outerData.hasOwnProperty('error')) {
                    return context.commit('setMessage', context.state.messages.emptyData)
                }
                context.commit('setData', outerData.data)
                resolve(outerData)
                // context.dispatch('fillingComplementaryData', {
                //     data: outerData
                // })
                // return outerData
            })
            // .then((data) => {
            //         context.commit('setLoading', false)
            //         resolve(data)
            //     }
            // )
            .catch((v) => {
                if (v.status === 500) {
                    context.commit('setMessage', context.state.messages.error500)
                }
            })
    })
}

export function fillingComplementaryData(context, payload) {
    let data = payload.data
    context.commit('setDataTableActionsStatus', false)
    if (data.config) {
        context.commit('setIntroduction', {
            headers: data.config.headers,
            tableItems: data.config.settings.tableItems,
            tableSettings: data.config.settings.tableSettings
        })
        if (data.config.filters) {
            context.commit('setFiltersSetting', {
                headers: data.config.headers,
                filters: data.config.filters
            });
        }
    }
    if (data.columnValues) {
        let obj = data.columnValues
        context.commit('setColumnValues', obj)
    }
}