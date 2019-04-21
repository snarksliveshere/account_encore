<template>
    <v-card>
        <v-data-table
                :headers="headers"
                :items="items"
                :rows-per-page-items="setRows"
                class="elevation-1 table-wrap-control data_table_filters"
                :loading="getLoading"
                :hide-actions="getDataTableActionsStatus"
                :pagination.sync="pagination"
        >
            <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
            <template slot="headers" slot-scope="props">
                <tr>
                    <th
                            v-for="header in props.headers"
                            :key="header.text"
                            :style="'min-width:' + header.width + 'px'"
                            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                            @click="changeSort(header.value)"
                    >
                        <v-icon small>arrow_upward</v-icon>
                        {{ header.text }}
                    </th>
                </tr>
                <tr v-if="getTableSettings.needFilters">
                    <th
                            v-for="header in props.headers"
                            :key="header.text"
                    >
                        <div v-if="isSelectedContainsValue(header.value)">
                            <v-autocomplete flat hide-details small
                                            multiple
                                            clearable
                                            :items="columnValueList(header.value)"
                                            v-model="filtersField[header.value]"
                                            @input="filteredData"
                                            :search-input.sync="searchAutocomplete[header.value]"
                            >
                            </v-autocomplete>
                        </div>
                        <div v-else-if="isSearchedStringContainsValue(header.value)">
                            <input v-model.lazy="filtersField[header.value][0]"
                                   class="input-decoration"
                                   @change="filteredData"
                            >
                        </div>
                    </th>
                </tr>
                <tr  v-if="getTableSettings.needSum" class="data_table_sum">
                    <th
                            class="text-ellipsis text-xs-right"
                            v-for="value in props.headers"
                    >
                        {{ getSum(value) }}
                    </th>
                </tr>
            </template>
            <template slot="items" slot-scope="props">
                <tr>
                    <td
                            class="text-ellipsis"
                            :class="{'text-xs-right': checkIfParameterIntOrFloat(props.item[value])}"
                            v-for="value in getTableItems" :title="props.item[value]">
                        {{ props.item[value] }}
                    </td>
                    <td class="justify-center layout px-0" v-if="getTableSettings.needActions">
                        <v-flex
                                v-if="getTableSettings.needEdit"
                                class="text-xs-left"
                        >
                            <v-btn
                                    @click="editItem(props.item)"
                            >
                                <v-icon color="info">edit</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex
                                class="text-xs-left"
                                v-if="getTableSettings.needDelete"
                        >
                            <v-btn
                                    @click="deleteItem(props.item)"
                            >
                                <v-icon color="error">delete</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex
                                v-if="getTableSettings.needFollow"
                                class="text-xs-left"
                        >
                            <v-btn
                                    flat
                                    @click="followItem(props.item)"
                                    :class="[isFollowLink(props.item) ? 'primary' : 'warning']"
                            >
                                <v-icon color="black" class="font-weight-bold">arrow_forward</v-icon>
                            </v-btn>
                        </v-flex>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
    import {isEmptyObjectWithOutKeys} from "../utils";

    export default {
        data: () => ({
            setRows: [30, 50, 100, {"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}],
            filters: {},
            searched: {},
            filtersField: {},
            searchAutocomplete: {},
            pagination: {
                sortBy: null,
            }
        }),
        props: {
            headers: {
                type: Array,
            },
            items: {
                type: Array,
            },
            columnValues: {
                type: Object,
            },
            matchFollowButton: {
                type: Array,
                default: () => ['default']
            },
            excludedFieldsInSum: {
                type: Array,
                default: () => []
            },
            filtersData: {
                type: Object,
                default: () => ({})
            }
        },
        mounted() {
            this.setTableHeight();
        },
        beforeUpdate() {
            this.setFilters()
        },
        methods: {
            getSum(name) {
               let value = name['value']
               if (this.$props.excludedFieldsInSum.indexOf(value) != -1 ) {
                   return null;
               }
               let ad =  _.reduce(this.$props.items, function (res, item) {
                   if (undefined !== item[value] && null !== item[value]) {
                       let inner = item[value].toString().trim().replace(/\s/g, '').replace(',', '.')
                       if ((Number(inner) == inner && inner % 1 === 0) || (parseFloat(inner) == inner)) {
                           return +res + +inner;
                       }
                   }
                }, 0)
                if (undefined !== ad) {
                    return new Intl.NumberFormat('ru-RU').format(ad)
                }
            },
            isFollowLink(item) {
                let ids = this.$props.matchFollowButton
                if (ids.indexOf('default') === 0) return true
                if (this.getTableSettings.needFollow) {
                    if (ids.length > 0) {
                        return ids.indexOf(item.id) !== -1
                    }
                    return false
                }
                return false
            },
            isSearchedStringContainsValue(value) {
                if (typeof this.searched !== 'undefined') {
                    return this.searched.hasOwnProperty(value)
                }
            },
            isSelectedContainsValue(value) {
                if (typeof this.filters !== 'undefined') {
                    return this.filters.hasOwnProperty(value)
                }
            },
            editItem(item) {
                this.$store.dispatch('setItem', Object.assign({}, item))
                this.$emit('editDialog')
            },
            deleteItem(item) {
                this.$store.dispatch('setItem', Object.assign({}, item))
                this.$emit('deleteDialog')
            },
            followItem(item) {
                this.$store.dispatch('setItem', Object.assign({}, item))
                this.$emit('follow')
            },
            columnValueList(obj) {
                if (_.isEmpty(this.$props.columnValues)) return
                let data = this.$props.columnValues[obj]
                return data.map(columnName => {
                    if (columnName === null || columnName == '') {
                        return '<empty>'
                    }
                    return columnName;
                })
            },
            setTableHeight() {
                let tbody = document.querySelector('.table-wrap-control > div');
                let tableBoundingClientRect = tbody.getBoundingClientRect();
                let tableTop = tableBoundingClientRect.top;
                let windowHeight = window.innerHeight;
                tbody.style.height = (windowHeight - tableTop - (100)) + 'px';
            },
            async setFilters () {
                let filtersData = this.$store.getters.getFiltersData
                let filterData = this.$store.getters.getFiltersSettings
                this.filtersField = filterData.filtersField
                if (undefined !== filtersData && !isEmptyObjectWithOutKeys(filtersData) && null !== filtersData) {
                    _.forOwn(filterData.filtersField, (value, key) => {
                        if (_.has(filtersData, key)) {
                            this.filtersField[key] = filtersData[key]
                        }
                    });
                }
                this.searched = filterData.searched
                this.filters = filterData.filters
            },
            filteredData() {
                let filtersToSend = {}
                _.each(this.filtersField, (value, key) => {
                    if (value.length > 0) {
                        if (_.has(this.searched, key)) {
                            filtersToSend[key] = value[0]
                        } else {
                            filtersToSend[key] = value
                        }
                    }
                })
                this.$store.dispatch('setParams', {
                    data: filtersToSend
                })
            },
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },
            checkIfParameterIntOrFloat(item) {
                if (item && typeof item !== 'undefined') {
                    item = item.toString().trim().replace(/\s/g, '').replace(',', '.')
                    return (Number(item) == item && item % 1 === 0) || (parseFloat(item) == item)
                }
                return false
            },
        },
        computed: {
            getLoading() {
                return this.$store.getters.getLoading;
            },
            getTableItems() {
                return this.$store.getters.getTableItems
            },
            getDataTableActionsStatus() {
                return this.$store.getters.getDataTableActionsStatus
            },
            getTableSettings() {
                return this.$store.getters.getTableSettings
            },
        }
    }
</script>
<style scoped>
    .data_table_sum th {
        font-size: 14px;
        font-weight: bold;
        font-style: italic;
    }
    .data_table_sum {
        border-bottom: 2px dotted #ccc;
    }
</style>