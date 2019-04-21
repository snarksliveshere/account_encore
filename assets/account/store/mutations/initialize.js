export default {
    setUrlConst(state, payload) {
        state.url.data = payload.data
        state.url.edit = payload.edit
        state.url.delete = payload.delete
    },
    clearMessage(state) {
        state.message = {}
    },
    setMessage(state, payload) {
        state.message = payload
    },
    setLoading(state, payload) {
        state.loading = payload
    },
    setDataTableActionsStatus(state, payload) {
        state.hideActions = payload
    },
    setData(state, payload) {
        state.data = payload
    },
    pushData(state, payload) {
        state.data.push(payload)
    },

    setParams(state, payload) {
        _.forIn(payload, function (value, key) {
            state.params[key] = value
        })
    },
    setIntroduction(state, payload) {
        state.headers = payload.headers
        state.tableItems = payload.tableItems
        if (payload.tableSettings) {
            state.tableSettings = payload.tableSettings
        }
    },
    setColumnValues(state, payload) {
        let obj = {}
        _.each(payload, function (value, key) {
            if (value instanceof Object) {
                obj[key] = _.values(value)
            }
        })
        state.columnValues = obj
    },
    cleanIntroduction(state) {
        state.headers = []
        state.tableItems = []
        _.forOwn(state.tableSettings, (v, k) => {
            state.tableSettings[k] = false
        })
    },
    setFiltersSetting(state, payload) {
        let fields = {}
        let selected = {}
        let searched = {}
        _.each(payload.headers, function (value, key) {
            if (_.indexOf(payload.filters.excluded, value.value) == -1) {
                fields[value.value] = []
                if (_.indexOf(payload.filters.selected, value.value) >= 0) {
                    selected[value.value] = []
                } else {
                    searched[value.value] = ''
                }
            }
        })
        state.filtersSettings.filtersField = fields
        state.filtersSettings.filters = selected
        state.filtersSettings.searched = searched
    },
    setItem(state, payload) {
        state.item = payload
    },
    clean(state) {
        state.item = {}
    },
    setFiltersData(state, payload) {
        state.filtersData = payload
    }
}