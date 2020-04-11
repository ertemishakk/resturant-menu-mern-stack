const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = validateData = (data) => {
    let errors = {};

    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';


    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = 'First name is required'
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = 'Last name is required'
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }
    if (Validator.isEmpty(data.phonenumber)) {
        errors.phonenumber = 'Phone number is required'
    }
    if (!Validator.isNumeric(data.phonenumber)) {
        errors.phonenumber = 'Please enter phone number'
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = 'Address is required'
    }


    return {
        errors: errors,
        isValid: isEmpty(errors)
    }

}