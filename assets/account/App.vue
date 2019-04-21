<template>
    <div id="app">
        <v-app id="inspire">
            <v-navigation-drawer
                    fixed
                    app
                    :mini-variant.sync="mini"
            >
                <v-flex right>
                    <v-icon @click.stop="mini = !mini" class="drawer_sandwich" right>menu</v-icon>
                </v-flex>
                <v-list dense class="mt-4">
                    <template v-for="link in links">
                        <v-list-group
                                v-if="link.children"
                                v-model="link.model"
                                :key="link.title"
                                :prepend-icon="link.model ? link['icon-alt'] : link.icon"
                                append-icon=""
                        >
                            <v-list-tile slot="activator">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ link.title }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile
                                    v-for="(child, i) in link.children"
                                    :key="i"
                                    class="ml-4"
                            >
                                <v-list-tile-action v-if="child.icon">
                                    <v-icon>{{ child.icon }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title
                                            @click.stop="mini = !mini"
                                    >
                                        <router-link :to="child.url" tag="div" class="pointer">{{ child.title }}</router-link>
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                        <v-list-tile v-else @click="" :key="link.title">
                            <v-list-tile-action>
                                <v-icon>{{ link.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title
                                        @click.stop="mini = !mini"
                                >
                                    <router-link
                                            :to="link.url"
                                            tag="div"
                                            class="pointer"
                                    >{{ link.title }}</router-link>
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-navigation-drawer>
            <v-content class="px-1" style="margin-left:100px;">
                    <v-layout justify-center align-center>
                        <v-flex shrink>
                            <router-view></router-view>
                        </v-flex>
                    </v-layout>
            </v-content>
            <template v-if="message">
                <v-snackbar
                        :timeout="5000"
                        :multi-line="true"
                        :top="'top'"
                        :color="message.status"
                        @input="closeMessage"
                        :value="true"
                        class="text-uppercase font-weight-bold"
                >
                    {{ message.text }}
                    <v-btn
                            flat dark
                            @click.native="closeMessage"
                    >Close</v-btn>
                </v-snackbar>
            </template>
        </v-app>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data () {
            return {
                dialog: false,
                drawer: false,
                mini: true,
                links: [
                        {title: 'Home', icon: 'bookmark_border', url: '/'},
                        {title: 'Application', icon: 'device_unknown', url: '/application'},
                        {
                            icon: 'keyboard_arrow_down',
                            'icon-alt': 'keyboard_arrow_up',
                            title: 'Mapping',
                            model: false,
                            children: [
                                {title: 'Application Map', icon: 'compare_arrows', url: '/application-mapping'},
                                {title: 'Traffic Source Map', icon: 'compare_arrows', url: '/traffic-source-mapping'},
                            ]
                        },
                        // {title: 'Tracker Raw', icon: 'extension', url: '/tracker-raw'},
                        // {title: 'Statistics', icon: 'event', url: '/statistics'},
                        {title: 'Costs', icon: 'account_balance_wallet', url: '/costs'},
                        {
                            icon: 'keyboard_arrow_down',
                            'icon-alt': 'keyboard_arrow_up',
                            title: 'Matching',
                            model: false,
                            children: [
                                {title: 'Match offers', icon: 'gavel', url: '/match-offer'},
                                {title: 'Manual Matching', icon: 'fingerprint', url: '/manual-matching-list'},
                                {title: 'Manual Matching Bunches', icon: 'settings_input_composite', url: '/manual-matching-bunches'},

                            ]
                        },
                        {title: 'Master Offer', icon: 'directions_boat', url: '/master-offer'},
                        {title: 'Dashboard', icon: 'dashboard', url: '/flat-dashboard'},
                    ],
            }
        },
        props: {
            source: String
        },
        watch: {
            mini(val) {
                if (true === val) {
                    _.each(this.links, val => {
                        if (false !== val['model']) {
                            val['model'] = false
                        }
                    })
                }
            }
        },
        computed: {
            message() {
                return this.$store.getters.getMessage
            },

        },
        methods: {
            closeMessage() {
                this.$store.dispatch('clearMessage')
            },
        }
    }
</script>

<style>
    .pointer {
        cursor: pointer;
    }
    a:hover, a:focus {
        text-decoration:none;
    }
    .table-wrap-control .v-table__overflow {
        overflow-y: auto;
    }
    .text-ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 170px;
    }
    .input-decoration {
        padding: 10px;
        border:1px solid #ccc;
        border-radius: 3px;
        width: 100%;
    }
    .main_menu__dropdown {
        position: absolute;
        left: 0;
        border:2px solid #ccc;
    }
    nav.navbar.navbar-default.navbar-inverse {
        display: none;
    }
    .drawer_sandwich {
        margin-top:10px;
        margin-right: 28px;
    }
    .two_columns > .v-menu__content{
        width: 500px;
        max-width: none;
    }
    .two_columns  .v-list {
        column-count: 2;
    }
    .data_table_filters thead th {
        position:sticky;
        background-color: #fff;
        z-index: 2;
    }
    .data_table_filters thead tr:first-child th {
        top:0;
    }
    .data_table_filters thead tr:nth-child(2) th {
        top:54px;
    }
    .data_table_filters thead tr:nth-child(3) th {
        top:108px;
    }
    .router-link-exact-active {
        font-weight: bold;
    }
</style>