import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import errorReducer from './errorReducer'


export default combineReducers({
    menu: menuReducer,
    error: errorReducer

})