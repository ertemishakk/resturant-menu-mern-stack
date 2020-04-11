import React, { Component } from 'react'
import { Button, Row, Col, Form, Input, InputGroup, Label, FormGroup, Alert } from 'reactstrap'
import { sendData, checkOut } from '../actions/menuActions'
import { connect } from 'react-redux'
import classnames from 'classnames'
import StripeCheckout from 'react-stripe-checkout'


class CheckOut extends Component {
    state = {
        firstname: '',
        lastname: '',
        phonenumber: '',
        email: '',
        description: '',
        apartment: '',
        address: '',
        suburb: '',
        comments: '',
        zerocontact: false,
        paymentType: null,
        nameoncard: '',
        expiry: '',
        cvn: '',
        cardnumber: '',
        cartTotal: '',
        showWarning: false,
        errors: {},
        showSuccess: false
    }
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                suburb: this.props.location.state.location,
                cartTotal: Math.round(((5 + this.props.location.state.cart.map(eachItem => eachItem.quantity * eachItem.price).reduce((total, currentValue) => total + currentValue)) * 100) / 100).toFixed(2)
            })
        }
        else if (localStorage.getItem('shopping_cart') && localStorage.getItem('location')) {
            var cart = JSON.parse(localStorage.getItem('shopping_cart'))
            var location = JSON.parse(localStorage.getItem('location'))

            this.setState({
                cartTotal: Math.round(((5 + cart.map(eachItem => eachItem.quantity * eachItem.price).reduce((total, currentValue) => total + currentValue)) * 100) / 100).toFixed(2),
                suburb: location
            })
        }
        else {
            this.setState({
                showWarning: true
            })
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.error !== prevProps.error) {
            this.setState({
                errors: this.props.error
            })
        }
        if (this.props.data.orderProcessed !== prevProps.data.orderProcessed) {
            this.setState({
                showSuccess: true
            })
            setTimeout(() => {
                localStorage.clear()
                this.props.history.push('/')
            }, 5000)

        }
    }
    sendBack = (e) => {
        this.props.history.goBack()
    }
    sendMainPage = (e) => {
        this.props.history.push('/')
    }
    onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value,

        })
    }
    checkBox = (e) => {
        if (e.target.name === 'zerocontact') {
            this.setState({
                zerocontact: !this.state.zerocontact
            })
        }
        else {
            this.setState({
                paymentType: e.target.name
            })
        }
    }

    submitForm = (e) => {

        e.preventDefault();
        let data = this.state
        this.props.sendData(data)
        if (this.state.firstname !== '' ||
            this.state.lastname !== '' ||
            this.state.phonenumber !== '' ||
            this.state.address !== '' ||
            this.state.email !== '') {
            document.getElementById('payButton').click()

        }
    }

    makePayment = (token) => {
        let fields = this.state
        let data = { token, fields }
        this.props.checkOut(data)
    }



    render() {
        return (
            <div className='checkout  px-3'>
                <div className='text-center '>
                    {this.state.showSuccess && (
                        <Alert color='success'>
                            Your order has been receieved. We will let you know when it's on the way. You are
                            being redirected to <span style={{ cursor: 'pointer' }} onClick={this.sendMainPage}>mainpage</span>.
                        </Alert>
                    )}
                    {this.state.showWarning ? (
                        <Button
                            onClick={this.sendMainPage}
                            className='float-left bg-light text-dark border-0'>
                            <i style={{ fontSize: '13px' }} className='fas fa-chevron-left pr-1' />
                            <span className='my-auto'>Menu</span></Button>
                    ) : (
                            <Button
                                onClick={this.sendBack}
                                className='float-left bg-light text-dark border-0'>
                                <i style={{ fontSize: '13px' }} className='fas fa-chevron-left pr-1' />
                                <span className='my-auto'>Back</span></Button>
                        )}

                    <h2 className=' d-inline'>Checkout</h2>
                    {this.state.showWarning && (
                        <Row>
                            <Col className='px-5 mt-3 '>
                                <Alert color="danger" >
                                    Your shopping cart is empty.
                                    <span style={{ cursor: 'pointer' }} className='text-primary' onClick={this.sendMainPage}> Go to mainpage</span>  to see the menu.
      </Alert>
                            </Col>
                        </Row>
                    )}

                    <Row className='mb-5'>
                        <Col md='6' className='px-5 mt-3 '>
                            <div className=' float-left border-bottom w-100'>
                                <span className='float-left'>Contact Information</span>

                            </div>
                            <div>
                                <Form>
                                    <InputGroup className='pt-3'>
                                        <Input placeholder='First Name*' onChange={this.onChange} value={this.state.firstname} name='firstname' className={classnames('', { 'is-invalid': this.state.errors.firstname })} />
                                        <div className='invalid-feedback'>{this.state.errors.firstname}</div>

                                    </InputGroup>
                                    <InputGroup className='mt-2'>
                                        <Input placeholder='Last Name*' onChange={this.onChange} value={this.state.lastname} name='lastname' className={classnames('', { 'is-invalid': this.state.errors.lastname })} />
                                        <div className='invalid-feedback'>{this.state.errors.lastname}</div>

                                    </InputGroup>
                                    <InputGroup className='mt-2'>
                                        <Input placeholder='Phone Number*' onChange={this.onChange} value={this.state.phonenumber} name='phonenumber' className={classnames('', { 'is-invalid': this.state.errors.phonenumber })} />
                                        <div className='invalid-feedback'>{this.state.errors.phonenumber}</div>
                                    </InputGroup>
                                    <InputGroup className='mt-2'>
                                        <Input placeholder='Email*' onChange={this.onChange} value={this.state.email} name='email' className={classnames('', { 'is-invalid': this.state.errors.email })} />
                                        <div className='invalid-feedback'>{this.state.errors.email}</div>

                                    </InputGroup>

                                </Form>
                            </div>

                            <div className=' float-left border-bottom w-100 mt-3'>
                                <span className='float-left'>Delivery Address</span>

                            </div>
                            <div>
                                <Form>
                                    <InputGroup className='pt-3'>
                                        <Input placeholder='Apartment #' onChange={this.onChange} value={this.state.apartment} name='apartment' />
                                    </InputGroup>
                                    <InputGroup className='mt-2'>
                                        <Input placeholder='Street Adress*' onChange={this.onChange} value={this.state.address} name='address' className={classnames('', { 'is-invalid': this.state.errors.address })} />
                                        <div className='invalid-feedback'>{this.state.errors.address}</div>

                                    </InputGroup>
                                    <InputGroup className='mt-2'>
                                        <Input placeholder='Suburb*' disabled onChange={this.onChange} value={this.state.suburb} name='suburb' />
                                    </InputGroup>
                                </Form>
                            </div>

                            <div className='float-left border-bottom w-100 mt-3'>

                                <span className='float-left'>

                                    Add comments including allergies...</span>

                            </div>

                            <div>
                                <Form >
                                    <InputGroup className='pt-3'>
                                        <Input type="textarea" placeholder='comments & allergies' rows='4' onChange={this.onChange} value={this.state.comments} name='comments'
                                        //  className={classnames('', { 'is-invalid': errors.description })}
                                        />
                                    </InputGroup>

                                </Form>
                            </div>



                        </Col>
                        <Col md='6' className='px-5 mt-3'>
                            <div className='float-left border-bottom w-100 '>

                                <span className='float-left'>
                                    <i className="fas fa-plus-circle text-danger pr-1 "></i>
                                    ZERO CONTACT DELIVERY AVAILABLE</span>

                            </div>

                            <div>
                                <Form className='text-left mx-4 '>
                                    <InputGroup className='text-muted py-2'>
                                        <Input type="checkbox" name="zerocontact" onClick={this.checkBox} />
                                        Click to request zero contact delivery.
                                        Your meal will be placed at the door.
                                        The driver will contact you at a safe distance.
                                 </InputGroup>
                                </Form>
                            </div>

                            <div className='float-left border-bottom w-100'>
                                <span className='float-left mt-2'>Delivery Driver Instructions</span>
                            </div>
                            <div>

                                <Form >
                                    <InputGroup className='pt-3'>
                                        <Input type="textarea" rows='4' placeholder="description" onChange={this.onChange} value={this.state.description} name='description'
                                        //  className={classnames('', { 'is-invalid': errors.description })}
                                        />
                                    </InputGroup>

                                </Form>
                            </div>


                            {/* <div className='float-left border-bottom w-100 mt-3'>

                                <span className='float-left'>

                                    Select Payment Option</span>

                            </div>

                            <div>
                                <span className='float-left text-muted mt-3'>Payment Type
                                <span className='text-danger'>*</span>
                                </span>

                                <Form className='d-inline'>

                                    <FormGroup check inline className='mt-3'>
                                        <Label check>
                                            <Input type='checkbox' name='creditCard' onClick={this.checkBox} />
                                            Credit Card
                                        </Label>
                                    </FormGroup>

                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type='checkbox' name='paypal' onClick={this.checkBox} />
                                            Paypal
                                        </Label>
                                    </FormGroup>
                                </Form>
                            </div>

                            {this.state.paymentType === 'creditCard' && (
                                <div>
                                    <Form>
                                        <InputGroup className='pt-3'>
                                            <Input placeholder='Name on Card*' onChange={this.onChange} value={this.state.nameoncard} name='nameoncard' />
                                        </InputGroup>
                                        <InputGroup className='mt-2'>
                                            <Input placeholder='Card Number*' onChange={this.onChange} value={this.state.cardnumber} name='cardnumber' />
                                        </InputGroup>
                                        <InputGroup className='mt-2' inline>
                                            <Input placeholder='Expiartion Date*' onChange={this.onChange} value={this.state.expiry} name='expiry' />
                                            <Input placeholder='CVN*' onChange={this.onChange} value={this.state.cv} name='cvn' />
                                        </InputGroup>
                                    </Form>
                                </div>
                            )} */}



                            <div>
                                <h2 className='mt-3'>Order Total ${this.state.cartTotal !== '' ? this.state.cartTotal : 0}</h2>
                            </div>


                            <div>
                                <Button
                                    disabled={this.state.firstname === '' ||
                                        this.state.lastname === '' ||
                                        this.state.email === '' ||
                                        this.state.phonenumber === '' ||
                                        this.state.address === ''
                                    }
                                    onClick={this.submitForm}
                                    className='w-100 mt-3 btn-lg bg-success border-0'>ORDER NOW</Button>

                                <StripeCheckout
                                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                                    token={this.makePayment}
                                    name={this.props.data.restaurantData.restaurant_name}
                                    description={this.props.data.restaurantData.restaurant_street}
                                    amount={this.state.cartTotal * 100}
                                    email={this.state.email}
                                    bitcoin
                                    currency='AUD'


                                >
                                    <Button
                                        disabled={this.state.firstname === '' ||
                                            this.state.lastname === '' ||
                                            this.state.email === '' ||
                                            this.state.phonenumber === '' ||
                                            this.state.address === ''
                                        }
                                        hidden
                                        id='payButton'
                                        className='w-100 mt-3 btn-lg bg-success border-0'>ORDER NOW</Button>
                                </StripeCheckout>

                            </div>



                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    data: state.menu,
    error: state.error
})

export default connect(mapStateToProps, { sendData, checkOut })(CheckOut)