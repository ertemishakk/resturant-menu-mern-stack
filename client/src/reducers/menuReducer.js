import { GET_RESTAURANT_DATA, CHECKOUT } from '../actions/types'

const initialState = {
    restaurantData: {},
    menuData: [],
    orderProcessed: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RESTAURANT_DATA:
            return {
                ...state,
                restaurantData: action.payload[0].restaurant_info,
                menuData: action.payload[0].menu_info
            }
        case CHECKOUT:
            return {
                ...state,
                orderProcessed: true
            }

        default: return state;
    }
}