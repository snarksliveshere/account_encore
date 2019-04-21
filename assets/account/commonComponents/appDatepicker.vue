<template>
    <v-menu
            ref="menu"
            class="app-datepicker-menu"
            content-class="app-datepicker-menu__content"
            min-width="auto"
            max-width="400px"
            v-model="menu"
            :close-on-content-click="false"
            :return-value="localDates"
            :nudge-top="-10"
    >
        <v-text-field readonly
                      class="app-input"
                      append-icon="apps"
                      slot="activator"
                      :value="textDate"
                      placeholder="Date"
        ></v-text-field>

        <v-date-picker no-title
                       multiple
                       ref="datepicker"
                       max-width="320px"
                       first-day-of-week="1"
                       :value="localDates"
                       :max="formatDate(new Date())"
                       @input="changeDates"
                       color="primary"
        >
            <v-container pt-0>
                <v-divider></v-divider>

                <v-layout row wrap xs12 class="app-datepicker__periods">
                    <v-btn flat v-for="(date, i) in patterns"
                           :key="`ddp_${i}`"
                           :color="getPeriodColor(date)"
                           @click="selectPatternDates(date)"
                           left
                    >{{ `${date}` }}</v-btn>
                </v-layout>

                <v-divider></v-divider>

                <v-layout row xs12 justify-end>
                    <v-btn flat color="error" @click="menu = false">cancel</v-btn>
                    <v-btn flat color="success" @click="save()">ok</v-btn>
                </v-layout>
            </v-container>

        </v-date-picker>
    </v-menu>
</template>

<script>
    import {
        selectPeriod,
        selectPatternDates,
        formatDate
    } from '../utils'

    export default {
        name: 'AppDatepicker',
        props: {
            initialDates: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                menu: null,
                patterns: [
                    'today', 'yesterday', 'thisWeek', 'lastWeek',
                    'thisMonth', 'lastMonth', 'thisYear', 'lastYear'
                ],
                localDates: [],
                localSelectedPattern: 'today',
                clickOnButtonSave: false
            }
        },
        computed: {
            textDate() {
                const dates = this.localDates
                if (dates.length > 1) {
                    return `${dates[0]} - ${dates[dates.length - 1]}`
                }
                if (dates.length > 0) {
                    return dates[0]
                }
                return null
            }
        },
        watch: {
            menu(value) { if (!value && !this.clickOnButtonSave) this.setOriginalValue() },
        },
        beforeMount(){
            if (false !== this.$props.initialDates) {
                this.selectPatternDates('thisMonth')
                this.$store.dispatch('setParams', {
                    date: {
                        first: _.first(this.localDates),
                        last: _.last(this.localDates)
                    }
                })
            }
        },
        methods: {
            getPeriodColor(pattern) {
                return pattern === this.localSelectedPattern ? 'secondary' : 'primary'
            },
            save() {
                this.clickOnButtonSave = true
                this.$refs.menu.save(this.localDates)
                _.sortedUniq(this.localDates);
                this.$store.dispatch('setParams', {
                    date: {
                        first: _.first(this.localDates),
                        last: _.last(this.localDates)
                    }
                })
                this.clickOnButtonSave = false
            },
            setOriginalValue() {
                const dates = this.$refs.menu.originalValue
                if (dates) {
                    this.localDates = dates
                } else {
                    this.localDates = []
                }
                this.localSelectedPattern = 'today'
            },
            formatDate(date) { return formatDate(date) },
            changeDates(dates) {
                const { inputDate } = this.$refs.datepicker
                this.localSelectedPattern = ''

                if (dates.length > 2) {
                    this.localDates = [inputDate]
                } else if (dates.length > 1) {
                    const array = dates.map(date => new Date(date)) // Конвертирование в массив Date

                    const start = new Date(Math.min.apply(null, array))
                    const end = new Date(Math.max.apply(null, array))

                    const day = new Date(inputDate)

                    if (day > start && day < end) {
                        this.localDates = [inputDate]
                    } else {
                        const period = selectPeriod(start, end)
                        this.localDates = period
                    }
                } else {
                    this.localDates = dates
                }
            },
            selectPeriod(start, end) { return selectPeriod(start, end) },
            selectPatternDates(pattern) {
                if (this.localSelectedPattern === pattern) {
                    this.localSelectedPattern = ''
                } else {
                    this.localSelectedPattern = pattern
                }

                const dates = selectPatternDates(pattern)

                if (dates.length === this.localDates.length
                    && dates.every(date => this.localDates.includes(date))) {
                    this.localDates = []
                } else {
                    this.localDates = dates
                }
            }
        }
    }
</script>
<style>
    .app-datepicker__periods .v-btn {
        -ms-flex-preferred-size: 45%;
        flex-basis: 45%;
    }
    .app-datepicker__periods .v-btn__content {
        align-items: flex-start;
        justify-content: flex-start;
    }
    .app-datepicker__periods .v-btn+.v-btn {
        margin-left: 0;
    }
</style>
