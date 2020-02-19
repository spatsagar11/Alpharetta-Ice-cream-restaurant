import { ACTION_TYPES, LIST_STATUS } from './reducer.js';

export function setListStatus(status) {
    return {
        type: ACTION_TYPES.SET_LIST_STATUS,
        data: {
            listStatus: status
        }
    }
}
export function setListItems(items) {
    return {
        type: ACTION_TYPES.SET_LIST_ITEMS,
        data: {
            items
        }
    }
}

export function fetchRestaruants() {
    return async (dispatch) => {
        dispatch(setListStatus(LIST_STATUS.FETCHING));
        const response = await fetch('/api/business-info');
        const result = await response.json()
        dispatch(setListItems(result.result));
    }
}