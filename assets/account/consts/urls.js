import * as type from './types'

export const APPLICATION_URLS = {
    data: `/${type.APPLICATION}-data`,
    save: `/${type.APPLICATION}-save`,
    update: `/${type.APPLICATION}-edit`,
    delete: `/${type.APPLICATION}-delete`,
    getAdvertiserList: `/${type.APPLICATION}-advertiser-list`,
    get_single_record: `/${type.APPLICATION}-single-record`,
    required_record: `/${type.APPLICATION}-required-records`
}
// TODO: это вообще пока под вопросом
export const STATISTICS_URLS = {
    data_statistics: `/${type.STATISTICS}-data`,
    data_with_param_tracker_statistics: `/${type.STATISTICS}-param-data`,
    data_tracker_statistics_raw: `/${type.TRACKER_RAW}-data`,
    data_with_param_tracker_raw: `/${type.TRACKER_RAW}-param-data`
}
export const MAPPING_URLS = {
    data_application: `/${type.TRACKER_APPLICATION_MAPPING}/data`,
    application_mapping_add_additional_data: `/${type.TRACKER_APPLICATION_MAPPING}/add-additional-data`,
    save_application_raw_name: `/${type.TRACKER_APPLICATION_MAPPING}/save-raw-name`,
    delete_application_raw_name: `/${type.TRACKER_APPLICATION_MAPPING}/delete-raw`,
    application_mapping_single_record: `/${type.TRACKER_APPLICATION_MAPPING}/single-record`,
    traffic_source_mapping_single_record: `/${type.TRACKER_TRAFFIC_SOURCE_MAPPING}/single-record`,
    data_traffic: `/${type.TRACKER_TRAFFIC_SOURCE_MAPPING}/data`,
    save_traffic_source_raw_name: `/${type.TRACKER_TRAFFIC_SOURCE_MAPPING}/save-raw-name`,
    delete_traffic_source_raw_name: `/${type.TRACKER_TRAFFIC_SOURCE_MAPPING}/delete-raw-name`,
    traffic_source_mapping_add_additional_data: `/${type.TRACKER_TRAFFIC_SOURCE_MAPPING}/add-additional-data`,

}
export const COSTS_COEFFICIENT_URLS = {
    data: `/${type.COSTS_COEFFICIENT}/data`,
    edit: `/${type.COSTS_COEFFICIENT}/edit`,
    create: `/${type.COSTS_COEFFICIENT}/create`,
    delete: `/${type.COSTS_COEFFICIENT}/delete`,
    data_filter: `/${type.COSTS_COEFFICIENT}/data-filter`,
    data_on_required: `/${type.COSTS_COEFFICIENT}/param-required`,
    required_initialize_data: `/${type.COSTS_COEFFICIENT}/required-initialize-data`,
    get_single_record: `/${type.COSTS_COEFFICIENT}/get-single-record`,
}
export const MATCH_OFFER_URLS = {
    data: `/${type.MATCH_OFFER}/data`,
    edit: `/${type.MATCH_OFFER}/edit`,
    data_filter: `/${type.MATCH_OFFER}/data-filter`,
    add_platform_application: `/${type.MATCH_OFFER}/platform-application`,
}
export const MANUAL_MATCHING_URLS = {
    list: `/${type.MANUAL_MATCHING}-list-data`,
    item: `/${type.MANUAL_MATCHING}-list`,
    edit: `/${type.MANUAL_MATCHING}-edit`,
    add_platform_application: `/${type.MANUAL_MATCHING}-platform-application`,
    data_filter: `/${type.MANUAL_MATCHING}-data-filter`,
}
export const MANUAL_MATCHING_BUNCHES_URLS = {
    data: `/${type.MANUAL_MATCHING_BUNCHES}-data`,
    delete: `/${type.MANUAL_MATCHING_BUNCHES}-delete`,
    edit: `/${type.MANUAL_MATCHING_BUNCHES}-bunches-edit`,
    // TODO: это дубль
    add_platform_application: `/${type.MANUAL_MATCHING}-platform-application`,
    data_filter: `/${type.MANUAL_MATCHING_BUNCHES}-data-filter`,
    request_single_record: `/${type.MANUAL_MATCHING_BUNCHES}-single-record`,
}
export const MASTER_OFFER_URLS = {
    data: `/${type.MASTER_OFFER}-data`,
    edit: `/${type.MASTER_OFFER}-edit`,
    save: `/${type.MASTER_OFFER}-save`,
    data_filter: `/${type.MASTER_OFFER}-data-filter`,
    get_single_record: `/${type.MASTER_OFFER}-single-record`,
    add_additional_data: `/${type.MASTER_OFFER}-list-additional-data`,
    master_offer_revenue_data: `/${type.MASTER_OFFER}-revenue-data`,
    master_offer_revenue_data_filter: `/${type.MASTER_OFFER}-revenue-data-filter`,
    master_offer_revenue_additional_data: `/${type.MASTER_OFFER}-revenue-additional-data`,
    master_offer_revenue_save: `/${type.MASTER_OFFER}-revenue-save`,
    master_offer_revenue_delete: `/${type.MASTER_OFFER}-revenue-delete`,
    master_offer_revenue_get_required_records: `/${type.MASTER_OFFER}-revenue-required-records`,
    master_offer_revenue_single_record: `/${type.MASTER_OFFER}-revenue-single-record`,
    master_offer_revenue_bunches_data: `/${type.MASTER_OFFER}-revenue-bunches-data`,
    master_offer_revenue_bunches_data_filter: `/${type.MASTER_OFFER}-revenue-bunches-data-filter`,
    master_offer_revenue_bunches_additional_data: `/${type.MASTER_OFFER}-revenue-bunches-additional-data`,
    master_offer_revenue_bunches_save: `/${type.MASTER_OFFER}-revenue-bunches-save`,
    master_offer_revenue_bunches_required_records: `/${type.MASTER_OFFER}-revenue-bunches-required-records`,
    master_offer_revenue_bunch_delete: `/${type.MASTER_OFFER}-revenue-bunch-delete`,
    master_offer_revenue_bunches_single_record: `/${type.MASTER_OFFER}-revenue-bunches-single-record`
}
export const DASHBOARD_URLS = {
    flat_data: `/${type.FLAT_DASHBOARD}-data`,
    flat_request_data_param: `/${type.FLAT_DASHBOARD}-param`,
    flat_request_data_filter: `/${type.FLAT_DASHBOARD}-filter`,
    flat_additional_data: `/${type.FLAT_DASHBOARD}-additional-data`,
    flat_get_csv: `/${type.FLAT_DASHBOARD}-csv`,
    download_csv: `/${type.FLAT_DASHBOARD}-download-csv`,
}
