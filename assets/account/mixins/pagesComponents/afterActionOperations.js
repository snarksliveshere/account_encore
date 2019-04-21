export const updated = {
    methods: {
        updatedRow(id, url, index) {
            this.$store.dispatch('getDataByParam', {
                url: url,
                data: {
                    id: id
                }
            })
            .then(result => {
                this.$store.dispatch('insertUpdatedRow', {
                    data: result.data[0],
                    indexId: index
                })
            })
        }
    }
}
export const deleted = {
    methods: {
        deleteRow(id, index) {
            this.$store.dispatch('removeDeletedRow', {
                id: id,
                indexId: index
            });
        }
    }
}
export const inserted = {
    methods: {
        insertNewRow(url, itemsIndex, modifier = null) {
            if (false == this.getInitializeData || typeof this.getInitializeData === 'undefined') {
                this.initialize()
                return
            }
            let items = this.getItemSetFromCollection(itemsIndex)
            this.$store.dispatch('insertNewRows', {
                url: url,
                data: {
                    ids: items,
                    modifier: modifier
                }
            })
        },
        getItemSetFromCollection(item) {
            let items = []
            _.each(this.getInitializeData, (value) => {
                _.forOwn(value, (v, k) => {
                    if (k === item) {
                        items.push(v)
                    }
                })
            })
            return items
        }
    }
}