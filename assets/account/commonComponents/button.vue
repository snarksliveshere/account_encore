<template>
    <v-btn :color="buttonColor" @click="buttonClick" :class="buttonMargin">{{ buttonName }}</v-btn>
</template>
<script>
    export default {
        name: "applyFilterButton",
        props: {
            buttonName: {
                type: String,
                default: 'Apply Filter'
            },
            buttonColor: {
                type: String,
                default: 'primary'
            },
            buttonMargin: {
                type: String,
                default: 'my-4'
            }
        },
        methods: {
            buttonClick() {
                this.$emit('buttonClick')
            }
        }
    }
</script>
