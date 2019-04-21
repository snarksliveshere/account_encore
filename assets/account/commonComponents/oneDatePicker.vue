<template>
    <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
    >
        <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="save">OK</v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
    export default {
        name: "oneDatePicker",
        props: ['checkStatus'],
        data: () => ({
            date: '',
            menu: false,
        }),
        watch: {
            checkStatus(val) {
                this.menu = val
            }
        },
        methods: {
            save() {
                this.$refs.menu.save(this.date)
                this.$emit('sendDate', this.date)
            }
        }
    }
</script>

<style scoped>

</style>