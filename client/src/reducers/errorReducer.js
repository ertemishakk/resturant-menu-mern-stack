import { FORM_VALIDATION_ERROR } from '../actions/types.js'


const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case FORM_VALIDATION_ERROR:
            return action.payload;
        default: return state;
    }
}