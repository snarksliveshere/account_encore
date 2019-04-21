export default {
    getData: state => state.data,
    getHTTP: state => state.http,
    getMessage(state) {
        let message = {}
        for (var prop in state.message) {
            message.status = prop;
            message.text = state.message[prop];
        }
        if (_.isEmpty(message)) {
            return null
        }
        return message
    },
    getLoading: state => state.loading,
    getInitializeData: state => state.data,
    getDataTableActionsStatus: state => state.hideActions,
    getRequiredData: state => state.requiredData,

    getHeaders: state => state.headers,
    getTableItems: state => state.tableItems,
    getParams:  state => state.params,
    getTableSettings: state => state.tableSettings,
    getCurrentItem: state => state.item,
    getCurrentItemId: state => state.item.id,
    getFiltersSettings: state => state.filtersSettings,
    getColumnValues: state => state.columnValues,
    getFiltersData: state => state.filtersData
}