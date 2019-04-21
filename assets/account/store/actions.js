import {initialize, fillingComplementaryData} from "./actions/initialize";
import {clearMessage, setItem, setParams} from "./actions/gate";
import {sendCUDRequest, getDataByParam, getRequiredData, sendRequestFilterData, getGroupDataByParam} from "./actions/onDemand";
import {removeDeletedRow, insertNewRows, insertUpdatedRow} from "./actions/afterAction";

export default {
    initialize,
    fillingComplementaryData,

    clearMessage,
    setParams,
    setItem,

    sendCUDRequest,
    getDataByParam,
    getRequiredData,
    sendRequestFilterData,
    getGroupDataByParam,

    removeDeletedRow,
    insertNewRows,
    insertUpdatedRow,
}