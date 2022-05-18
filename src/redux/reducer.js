import { SET_ITEMS_SELECTED } from './constants/index';

export const setItemsSelected = (data) => ({
    type: SET_ITEMS_SELECTED,
    data: data,
})

const initialState = {
    itemSelected: {}
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_ITEMS_SELECTED: {
            return {
                ...state,
                itemSelected: action.data,
            }
        }

        default:
            return state
    }
}

export default rootReducer