export default {
    data: [],
    http: {},
    url: {
        data: ''
    },
    message: {},
    unique: {},
    requiredData: {},
    loading: true,
    messages: {
        errorFailed: {
            error: 'Data loading failed'
        },
        emptyData: {
            info: 'No data found for your request'
        },
        filterSuccess: {
            success: 'filter successfully applied'
        },
        error500: {
            error: 'An internal error has occurred.'
        },
        successAction: {
            success: 'Changes are successfully applied'
        }
    },
    hideActions: false,

    headers: [],
    tableItems: [],
    params: {},
    tableSettings: {
        needActions: false,
        needEdit: false,
        needDelete: false,
        needFollow: false,
        needFilters: false,
        needSum: false
    },
    item: {},
    filtersSettings: {},
    columnValues: {},

    filtersData: {}
}