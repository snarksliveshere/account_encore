import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import(/* webpackChunkName: "home" */ '../Pages/Home/Home.vue');
const Application = () => import(/* webpackChunkName: "application" */ '../Pages/Application/Application.vue');
const ApplicationMapping = () => import(/* webpackChunkName: "application_mapping" */ '../Pages/Mapping/ApplicationMapping.vue')
const TrafficSourceMapping = () => import(/* webpackChunkName: "traffic_source_mapping" */ '../Pages/Mapping/TrafficSourceMapping.vue')
const TrackerRaw = () => import(/* webpackChunkName: "tracker_raw" */ '../Pages/TrackerRaw/TrackerRaw.vue')
const Statistics = () => import(/* webpackChunkName: "statistics" */ '../Pages/Statistics/Statistics.vue')
const Costs = () => import(/* webpackChunkName: "costs" */ '../Pages/Costs/Costs.vue')
const ManualMatchingList = () => import(/* webpackChunkName: "manual_matching_list" */ '../Pages/ManualMatching/ManualMatchingList.vue')
const ManualMatchingItem = () => import(/* webpackChunkName: "manual_matching_item" */ '../Pages/ManualMatching/ManualMatchingItem.vue')
const ManualMatchingBunches = () => import(/* webpackChunkName: "manual_matching_bunches" */ '../Pages/ManualMatching/ManualMatchingBunches.vue')
const MatchOffer = () => import(/* webpackChunkName: "match_offer" */ '../Pages/MatchOffer/MatchOffer.vue')
const MasterOfferList = () => import(/* webpackChunkName: "master_offer" */ '../Pages/MasterOffer/MasterOfferList.vue')
const MasterOfferRevenue = () => import(/* webpackChunkName: "master_offer_revenue" */ '../Pages/MasterOffer/MasterOfferRevenue.vue')
const MasterOfferRevenueBunches = () => import(/* webpackChunkName: "master_offer_revenue_bunches" */ '../Pages/MasterOffer/MasterOfferRevenueBunches.vue')
const FlatDashboard = () => import(/* webpackChunkName: "flat_dashboard" */ '../Pages/Dashboard/FlatDashboard.vue')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '',
            name: 'home',
            component: Home
        },
        {
            path: '/application',
            name: 'application',
            component: Application
        },
        {
            path: '/application-mapping',
            name: 'application-mapping',
            component: ApplicationMapping
        },
        {
            path: '/traffic-source-mapping',
            name: 'traffic-source-mapping',
            component: TrafficSourceMapping
        },
        {
            path: '/tracker-raw',
            name: 'tracker-raw',
            component: TrackerRaw
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: Statistics
        },
        {
            path: '/costs',
            name: 'costs',
            component: Costs
        },
        {
            path: '/match-offer',
            name: 'match-offer',
            component: MatchOffer
        },
        {
            path: '/manual-matching-list',
            name: 'manual-matching-list',
            component: ManualMatchingList
        },
        {
            path: '/manual-matching-list/:date',
            name: 'manual-matching-item',
            component: ManualMatchingItem
        },
        {
            path: '/manual-matching-bunches',
            name: 'manual-matching-bunches',
            component: ManualMatchingBunches
        },
        {
            path: '/master-offer',
            name: 'master-offer',
            component: MasterOfferList
        },
        {
            path: '/master-offer/:id',
            name: 'master-offer-revenue',
            component: MasterOfferRevenue
        },
        {
            path: '/master-offer/:id/:bunch',
            name: 'master-offer-revenue-bunches',
            component: MasterOfferRevenueBunches
        },
        {
            path: '/flat-dashboard',
            name: 'flat-dashboard',
            component: FlatDashboard
        },

    ],
    mode: 'history'
})
