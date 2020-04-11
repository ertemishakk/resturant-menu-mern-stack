import {
    GET_RESTAURANT_DATA,
    VALIDATE_FORM,
    FORM_VALIDATION_ERROR,
    CHECKOUT,
    CHECKOUT_ERROR
} from './types'
import data from '../Components/data/data.json'
import axios from 'axios'

export const getResData = () => dispatch => {
    dispatch({
        type: GET_RESTAURANT_DATA,
        payload: data
    })
}

export const sendData = (data) => dispatch => {
    axios.post('/validateForm', data)
        .then(res => {
            dispatch({
                type: VALIDATE_FORM,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: FORM_VALIDATION_ERROR,
            payload: err.response.data
        }))

}

export const checkOut = (token) => dispatch => {
    axios.post('/checkout', token)
        .then(res => {
            dispatch({
                type: CHECKOUT,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: CHECKOUT_ERROR,
            payload: err.response.data
        }))

}