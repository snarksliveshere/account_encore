export const initializeDataTableWithFilters = {
    computed: {
        getHeaders() {
            return this.$store.getters.getHeaders
        },
        getInitializeData() {
            return this.$store.getters.getInitializeData
        },
        getColumnValues() {
            return this.$store.getters.getColumnValues
        },
        getLoading() {
            return this.$store.getters.getLoading;
        },
    },
    http: {
        emulateJSON: true,
        emulateHTTP: true
    },
    created() {
        this.initialize()
    },
}

export const initializeDataTableWithoutFilters = {
    computed: {
        getHeaders() {
            return this.$store.getters.getHeaders
        },
        getInitializeData() {
            return this.$store.getters.getInitializeData
        },
    },
    http: {
        emulateJSON: true,
        emulateHTTP: true
    },
    created() {
        this.initialize()
    },
}

export const initializeData = {
    methods: {
        initializeData() {
            return new Promise(() => {
                this.$store.dispatch('initialize')
                    .then((data) => {
                        this.$store.dispatch('fillingComplementaryData', {
                            data: data
                        })
                    })
                    .then(() => {
                        this.$store.commit('setLoading', false)
                    })
            })

        },
    }
}