import { combineReducers } from 'redux';

export const LIST_STATUS = {
    INITIAL: 'list.state.initial',
    FETCHING: 'list.state.fetching',
    FETCH_DONE: 'list.state.fetch_done',
    FETCH_ERROR: 'list.state.fetch_error'
}
const initialState = {
    items: [],
    listStatus: LIST_STATUS.INITIAL,
}
export const ACTION_TYPES = {
    SET_LIST_STATUS: 'list.set_status',
    SET_LIST_ITEMS: 'list.set_items'
}

function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_LIST_STATUS: {
            const { listStatus } = action.data;
            return {
                ...state,
                listStatus
            }
        }
        case ACTION_TYPES.SET_LIST_ITEMS: {
            const { items, listStatus = LIST_STATUS.FETCH_DONE } = action.data;
            return {
                ...state,
                items,
                listStatus
            }
        }
        default: {
            return state;
        }
    }
}

/*we don't need combinedReducer here as we have only one reducer function.
but as we scale we need this*/
export default combineReducers({
    'restaurant': restaurantReducer
})
