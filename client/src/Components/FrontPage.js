import React, { Component } from 'react'
import { Row, Col, Collapse, Form, Input, Button, InputGroup } from 'reactstrap'
import bitcoin from '../images/bitcoin.jpg'
import visa from '../images/visa.png'
import mastercard from '../images/mastercard.jpg'
import zerocontact from '../images/zerocontact.png'
import Flip from 'react-reveal/Flip';
import NotificationBadge from 'react-notification-badge';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class FrontPage extends Component {
    state = {
        results: [],
        cart: [],
        dropdownOpen: false,
        location: '',
        ordertype: 'delivery',
        time: '',
        elementHeight: 0,
        elementWidth: 0,
        windowHeight: 0,
        fullPageCart: false,
        offsetY: 0,

    }

    componentDidMount() {

        const results = this.props.data.menuData.map(item => {
            return {
                ...item,
                isOpened: true
            }
        })

        this.setState({ results })

        if (localStorage.getItem('shopping_cart')) {
            var cartItems = JSON.parse(localStorage.getItem('shopping_cart'))
            this.setState({
                cart: cartItems
            })
        }
        if (localStorage.getItem('order_type')) {
            var ordertype = JSON.parse(localStorage.getItem('order_type'))
            this.setState({ ordertype })
        }
        if (localStorage.getItem('time')) {
            var time = JSON.parse(localStorage.getItem('time'))
            this.setState({ time })
        }

        if (localStorage.getItem('location')) {
            var location = JSON.parse(localStorage.getItem('location'))
            this.setState({ location })
        }

        this.setState({
            windowHeight: window.innerHeight,


        })
        this.updateWindowDimension()
        window.addEventListener('resize', this.updateWindowDimension);
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimension);
        window.removeEventListener('scroll', this.listenToScroll)

    }

    listenToScroll = () => {
        this.setState({
            offsetY: window.pageYOffset
        })
    }

    toggleCart = (e) => {
        this.setState({
            fullPageCart: !this.state.fullPageCart
        })
        if (this.state.fullPageCart) {
            document.getElementById("myNav").style.width = "0%";
        } else {
            document.getElementById("myNav").style.width = "100%";

        }

    }

    checkOut = (e) => {

        this.props.history.push({
            pathname: '/checkout',
            state: {
                ordertype: this.state.ordertype,
                cart: this.state.cart,
                location: this.state.location,
                time: this.state.time
            }
        })
    }


    updateWindowDimension = (e) => {
        this.setState({
            divHeight: document.getElementById("basket").offsetWidth,
            windowHeight: window.innerHeight
        })
    }

    updateState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toggleDropdown = (e) => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    componentDidUpdate(prevProps, prevState) {

        if (this.props.data.menuData !== prevProps.data.menuData) {
            const results = this.props.data.menuData.map(item => {
                return {
                    ...item,
                    isOpened: true
                }
            })

            this.setState({ results })

        }

        if (this.state.ordertype !== prevState.ordertype) {
            let storage_order_type;
            if (localStorage.getItem('order_type')) {
                storage_order_type = JSON.parse(localStorage.getItem('order_type'))
            }
            storage_order_type = this.state.ordertype
            localStorage.setItem('order_type', JSON.stringify(storage_order_type))

        }

        if (this.state.time !== prevState.time) {
            let storage_time;
            if (localStorage.getItem('time')) {
                storage_time = JSON.parse(localStorage.getItem('time'))
            }
            storage_time = this.state.time;
            localStorage.setItem('time', JSON.stringify(storage_time))
        }

        if (this.state.location !== prevState.location) {
            let storage_location;
            if (localStorage.getItem('location')) {
                storage_location = JSON.parse(localStorage.getItem('location'))
            }
            storage_location = this.state.location
            localStorage.setItem('location', JSON.stringify(storage_location))
        }



    }
    removeItem = (id, e) => {

        var cart = [...this.state.cart]
        var index = cart.findIndex(item => item.id === id)
        if (cart[index].quantity > 1) {
            cart[index].quantity = cart[index].quantity - 1;
        }
        else {
            cart.splice(index, 1)

        }
        this.setState({ cart })

        let storageItems = JSON.parse(localStorage.getItem('shopping_cart'))
        let itemIndex = storageItems.findIndex(cartItem => cartItem.id === id)
        if (storageItems[itemIndex].quantity > 1) {
            storageItems[itemIndex].quantity = storageItems[itemIndex].quantity - 1
        }
        else {
            storageItems.splice(itemIndex, 1)
        }

        localStorage.setItem('shopping_cart', JSON.stringify(storageItems))

    }

    addToCart = (menuitem, e) => {
        if (this.state.cart.length !== 0) {
            var data = [...this.state.cart];
            var index = data.findIndex(obj => obj.id === menuitem.id);
            if (data[index]) {
                data[index].quantity = data[index].quantity + 1;

            }
            else {
                menuitem.quantity = 1

                this.setState({
                    cart: [...this.state.cart, menuitem]
                })
            }
            this.setState({ data });
        }
        else {
            menuitem.quantity = 1

            this.setState({
                cart: [...this.state.cart, menuitem]
            })
        }


        this.setState({
            elementHeight: this.divRef.clientHeight,
        })



        let cartItems = []

        if (localStorage.getItem('shopping_cart')) {
            cartItems = JSON.parse(localStorage.getItem('shopping_cart'))
            var itemIndex = cartItems.findIndex(item => item.id === menuitem.id)
            if (cartItems[itemIndex]) {
                cartItems[itemIndex].quantity = cartItems[itemIndex].quantity + 1
            }
            else {
                cartItems.push(menuitem)
            }

        }
        else {
            cartItems.push(menuitem)
        }
        localStorage.setItem('shopping_cart', JSON.stringify(cartItems))
    }

    handleClick = (index, e) => {
        const results = this.state.results.map((individual, idx) => {
            if (index === idx) {
                return {
                    ...individual,
                    isOpened: !individual.isOpened
                }
            }
            return individual
        })
        this.setState({ results })
    }


    render() {
        const date = new Date()
        console.log(this.state.results)
        return (
            <div className=' pb-2 '>

                <Row >
                    <Col md='8' className='mx-3'>
                        {this.state.results.map((each, index) => (
                            <div className='py-2' key={index} id={each.menu_title} >
                                <div className='menu-heading shadow' onClick={() => this.handleClick(index)}>
                                    <h2 className=' mx-1 menu-title' >{each.menu_title}
                                        <span className='float-right pr-2'>
                                            {!each.isOpened ? (
                                                <i className="fas fa-chevron-right"></i>

                                            ) : (
                                                    <i className="fas fa-chevron-down"></i>

                                                )}
                                        </span>
                                    </h2>
                                </div>

                                <div className='menu-items mx-3'>
                                    <Collapse isOpen={each.isOpened}>
                                        <Row>

                                            {each.menu_item.length % 2 === 0 ? each.menu_item.map(menuitems => (
                                                <Col xs='6' key={menuitems.id} className=' py-1 box' onClick={() => this.addToCart(menuitems)}>
                                                    <h5 className='font-weight-bold menu-item-title' style={{ fontSize: '16px' }}> {menuitems.item_name}</h5>
                                                    <p className='text-muted'>{menuitems.description}
                                                    </p>
                                                    <div className='' style={{ lineHeight: '30px' }}>
                                                        <h5 className='d-inline' style={{ verticalAlign: 'middle' }}>
                                                            ${Math.round((menuitems.price * 100) / 100).toFixed(2)}
                                                        </h5>
                                                        <i className="fas fa-plus-square pl-1" style={{ color: '#11bb24', fontSize: '25px', verticalAlign: 'middle' }}></i>
                                                    </div>
                                                </Col>
                                            )) : (

                                                    each.menu_item.map((menuitems, index) => (
                                                        index < each.menu_item.length - 1 ? (

                                                            <Col key={index} xs='6' className=' py-2 box' onClick={() => this.addToCart(menuitems)}>
                                                                <h5 className='font-weight-bold menu-item-title' style={{ fontSize: '16px' }}> {menuitems.item_name}</h5>
                                                                <p className='text-muted'>{menuitems.description}
                                                                </p>
                                                                <div className='' style={{ lineHeight: '30px' }}>
                                                                    <h5 className='d-inline' style={{ verticalAlign: 'middle' }}>
                                                                        ${Math.round((menuitems.price * 100) / 100).toFixed(2)}
                                                                    </h5>
                                                                    <i className="fas fa-plus-square pl-1" style={{ color: '#11bb24', fontSize: '25px', verticalAlign: 'middle' }}></i>
                                                                </div>
                                                            </Col>
                                                        ) : (

                                                                <Col key={index} xs='12' className=' py-2 box' onClick={() => this.addToCart(menuitems)}>

                                                                    <h5 className='font-weight-bold menu-item-title' style={{ fontSize: '16px' }}> {menuitems.item_name}</h5>
                                                                    <p className='text-muted'>{menuitems.description}
                                                                    </p>

                                                                    <div className='' style={{ lineHeight: '30px' }}>
                                                                        <h5 className='d-inline' style={{ verticalAlign: 'middle' }}>
                                                                            ${Math.round((menuitems.price * 100) / 100).toFixed(2)}
                                                                        </h5>
                                                                        <i className="fas fa-plus-square pl-1" style={{ color: '#11bb24', fontSize: '25px', verticalAlign: 'middle' }}></i>
                                                                    </div>
                                                                </Col>

                                                            )



                                                    ))
                                                )}

                                        </Row>
                                    </Collapse>

                                </div>
                            </div>
                        ))}
                        <div className='d-md-none hidden-cart border text-center bg-success' onClick={this.toggleCart}>
                            <i className="fas fa-shopping-cart container-fluid p-3 text-light">

                                <NotificationBadge count={
                                    this.state.cart.length !== 0 ?
                                        this.state.cart.map(eachItem => eachItem.quantity).reduce((total, currentValue) => total + currentValue) : 0
                                } />

                            </i>

                        </div>

                        <div className='overlay d-md-none pt-5' id="myNav" >
                            <div className='container border py-3' >
                                <h5 className='font-weight-bold cart-title shadow w-100 text-center '>ORDER BASKET
                                <span className='closebtn float-right' onClick={this.toggleCart} >&times;</span>
                                </h5>
                                <div className='mt-3 text-center'>
                                    {date.getHours() < 14 ? (
                                        <React.Fragment>
                                            <span className='text-danger warning'>Preorder for 2.30PM </span>
                                        </React.Fragment>
                                    ) :
                                        (
                                            <span>The store is open now.</span>

                                        )}
                                </div >
                                <div className='mt-3 text-center' >
                                    <Form>
                                        <InputGroup>
                                            <Input type='select' name='ordertype' className='text-center' value={this.state.ordertype} onChange={this.updateState}>
                                                <option value='delivery'>DELIVERY</option>
                                                <option value='pickup'>PICK UP</option>
                                            </Input>
                                        </InputGroup>
                                        <Input type='select' name='location' className='text-center mt-2' onChange={this.updateState} value={this.state.location} >
                                            <option hidden>SELECT LOCATION</option>
                                            <option value='3047 - BROADMEADOWS, VIC'>3047 - BROADMEADOWS, VIC</option>
                                            <option value='3047 - DALLAS, VIC'>3047 - DALLAS, VIC</option>
                                            <option value='3043 - GLADSTONE PARK, VIC'>3043 - GLADSTONE PARK, VIC</option>
                                            <option value='3046 - GLENROY'>3046 - GLENROY</option>
                                        </Input>
                                        <Input type='select' name='time' className='text-center mt-2' onChange={this.updateState} value={this.state.time}>
                                            <option hidden>SELECT DELIVERY TIME</option>
                                            <option value='ASAP PLEASE'>ASAP PLEASE</option>
                                            <option value='02.30 PM'>02.30 PM</option>
                                            <option value='03.00 PM'>03.00 PM</option>
                                            <option value='03.30 PM'>03.30 PM</option>
                                            <option value='04.00 PM'>04.00 PM</option>
                                            <option value='04.30 PM'>04.30 PM</option>
                                            <option value='05.00 PM'>05.00 PM</option>
                                            <option value='05.30 PM'>05.30 PM</option>
                                            <option value='06.00 PM'>06.00 PM</option>
                                            <option value='06.30 PM'>06.30 PM</option>
                                            <option value='07.00 PM'>07.00 PM</option>
                                            <option value='07.30 PM'>07.30 PM</option>
                                            <option value='08.00 PM'>08.00 PM</option>
                                            <option value='08.30 PM'>08.30 PM</option>
                                            <option value='09.00 PM'>09.00 PM</option>
                                            <option value='09.30 PM'>09.30 PM</option>
                                            <option value='10.00 PM'>10.00 PM</option>

                                        </Input>
                                    </Form>
                                </div>


                                {this.state.cart.map(eactCartItem => (
                                    <div className='cartList' key={eactCartItem.id}>

                                        <Flip bottom  >

                                            <span key={eactCartItem.id} className='float-left mt-2 border-bottom w-100'>x{eactCartItem.quantity} {eactCartItem.item_name}
                                                <span className='float-right'> ${Math.round((eactCartItem.price * 100) / 100).toFixed(2)}
                                                    <i className="fas fa-minus-circle text-danger" style={{ cursor: 'pointer' }} onClick={() => this.removeItem(eactCartItem.id)}></i></span>
                                            </span>
                                        </Flip>

                                    </div>

                                ))}

                                {(this.state.location !== '' || this.state.cart.length > 0) &&
                                    <div>
                                        <span className='float-left mt-2  w-100 mb-3 '>Delivery Fee
                              <span className='float-right'> $5.00</span>
                                        </span>
                                    </div>
                                }




                                {(this.state.cart.length > 0) && (
                                    <div>
                                        <h4 className='p-2 text-center cart-total'>ORDER TOTAL: $
                                {Math.round(((5 + this.state.cart.map(eachItem => eachItem.quantity * eachItem.price).reduce((total, currentValue) => total + currentValue)) * 100) / 100).toFixed(2)}
                                        </h4>
                                    </div>
                                )}
                                <div className='text-center mt-2 warning'>
                                    {this.state.time === '' && (
                                        <span className='text-danger '>
                                            <i className="fas fa-exclamation-circle pr-1"></i>
                                            Select a time.</span>
                                    )}

                                </div>

                                <div className='text-center mt-2 warning'>
                                    {this.state.location === '' && (
                                        <span className='text-danger '>
                                            <i className="fas fa-exclamation-circle pr-1"></i>
                                            Select your location.</span>
                                    )}

                                </div>

                                <div className='text-center mt-2 warning'>
                                    {(this.state.cart.length === 0 ||
                                        this.state.cart.map(eachItem => eachItem.quantity * eachItem.price).reduce((total, currentValue) => total + currentValue) < 15)
                                        && (
                                            <span className='text-danger '>
                                                <i className="fas fa-exclamation-circle pr-1"></i>
                                                Minimum order value $15.00.</span>
                                        )}

                                </div>

                                <div>
                                    <Button disabled={(this.state.cart.length === 0) ||
                                        (this.state.cart.length !== 0 &&
                                            (this.state.cart.map(eachItem => eachItem.quantity * eachItem.price).reduce((total, currentValue) => total + currentValue) < 15
                                                || this.state.time === '' || this.state.location === ''
                                            ))
                                    }
                                        className='bg-success w-100 mt-3 border-0'> <i className="fas fa-lock pr-1"
                                            onClick={this.checkOut}
                                        ></i> ORDER NOW</Button>
                                </div>

                                <div className='text-center mt-3'>
                                    <img className='payment-type mr-1' src={bitcoin} alt='bitcoin' />
                                    <img className='payment-type' src={mastercard} alt='mastercard' />
                                    <img className='payment-type' src={visa} alt='visa' />
                                </div>

                                <div className='text-center mt-3'>
                                    <img className='img-fluid mt-3' src={zerocontact} alt='zero-contact-delivery' />
                                </div>
                            </div>


                        </div>
                    </Col>
                    <Col md='3' className='d-none d-md-block' id='basket'>

                        <div className={(this.state.elementHeight < this.state.windowHeight) && (this.state.offsetY > 293) ? 'position-fixed ' : 'position-absolute'} ref={element => this.divRef = element}

                            style={{
                                top: this.state.offsetY > 293 && '60px',
                                width: this.state.offsetY > 293 && this.state.divHeight
                            }}>
                            <h5 className='font-weight-bold cart-title shadow w-100 text-center '>ORDER BASKET</h5>
                            <div className='mt-3 text-center'>
                                {date.getHours() < 14 ? (
                                    <React.Fragment>
                                        <span className='text-danger warning'>Preorder for 2.30PM </span>
                                    </React.Fragment>
                                ) :
                                    (
                                        <span>The store is open now.</span>

                                    )}
                            </div>
                            <div className='mt-3 text-center' >
                                <Form>
                                    <Input type='select' name='ordertype' className='text-center' value={this.state.ordertype} onChange={this.updateState}>
                                        <option value='delivery'>DELIVERY</option>
                                        <option value='pickup'>PICK UP</option>
                                    </Input>
                                    <Input type='select' name='location' className='text-center mt-2' onChange={this.updateState} value={this.state.location}>
                                        <option hidden>SELECT LOCATION</option>
                                        <option value='3047 - BROADMEADOWS, VIC'>3047 - BROADMEADOWS, VIC</option>
                                        <option value='3047 - DALLAS, VIC'>3047 - DALLAS, VIC</option>
                                        <option value='3043 - GLADSTONE PARK, VIC'>3043 - GLADSTONE PARK, VIC</option>
                                        <option value='3046 - GLENROY'>3046 - GLENROY</option>
                                    </Input>
                                    <Input type='select' name='time' className='text-center mt-2' onChange={this.updateState} value={this.state.time}>
                                        <option hidden>SELECT DELIVERY TIME</option>
                                        <option value='ASAP PLEASE'>ASAP PLEASE</option>
                                        <option value='02.30 PM'>02.30 PM</option>
                                        <option value='03.00 PM'>03.00 PM</option>
                                        <option value='03.30 PM'>03.30 PM</option>
                                        <option value='04.00 PM'>04.00 PM</option>
                                        <option value='04.30 PM'>04.30 PM</option>
                                        <option value='05.00 PM'>05.00 PM</option>
                                        <option value='05.30 PM'>05.30 PM</option>
                                        <option value='06.00 PM'>06.00 PM</option>
                                        <option value='06.30 PM'>06.30 PM</option>
                                        <option value='07.00 PM'>07.00 PM</option>
                                        <option value='07.30 PM'>07.30 PM</option>
                                        <option value='08.00 PM'>08.00 PM</option>
                                        <option value='08.30 PM'>08.30 PM</option>
                                        <option value='09.00 PM'>09.00 PM</option>
                                        <option value='09.30 PM'>09.30 PM</option>
                                        <option value='10.00 PM'>10.00 PM</option>

                                    </Input>
                                </Form>
                            </div>


                            {this.state.cart.map(eactCartItem => (
                                <div className='cartList' key={eactCartItem.id}>

                                    <Flip bottom  >

                                        <span key={eactCartItem.id} className='float-left mt-2 border-bottom w-100'>x{eactCartItem.quantity} {eactCartItem.item_name}
                                            <span className='float-right'> ${Math.round((eactCartItem.price * 100) / 100).toFixed(2)}
                                                <i className="fas fa-minus-circle text-danger" style={{ cursor: 'pointer' }} onClick={() => this.removeItem(eactCartItem.id)}></i></span>
                                        </span>
                                    </Flip>

                                </div>

                            ))}

                            {(this.state.location !== '' || this.state.cart.length > 0) &&
                                <div>
                                    <span className='float-left mt-2  w-100 mb-3 '>Delivery Fee
                              <span className='float-right'> $5.00</span>
                                    </span>
                                </div>
                            }




                            {(this.state.cart.length > 0) && (
                                <div>
                                    <h4 className='p-2 text-center cart-total'>ORDER TOTAL: $
                                {Math.round(((5 + this.state.cart.map(eachItem => eachItem.quantity * eachItem.price).reduce((total, currentValue) => total + currentValue)) * 100) / 100).toFixed(2)}
                                    </h4>
                                </div>
                            )}
                            <div className='text-center mt-2 warning'>
                                {this.state.time === '' && (
                                    <span className='text-danger '>
                                        <i className="fas fa-exclamation-circle pr-1"></i>
                                        Select a time.</span>
                                )}

                            </div>

                            <div className='text-center mt-2 warning'>
                                {this.state.location === '' && (
                                    <span className='text-danger '>
                                        <i className="fas fa-exclamation-circle pr-1"></i>
                                        Select your location.</span>
                                )}

                            </div>

                            <div className='text-center mt-2 warning'>
                                {(this.state.cart.length === 0 ||
                                    this.state.cart.map(eachItem => eachItem.quantity * eachItem.price).reduce((total, currentValue) => total + currentValue) < 15)
                                    && (
                                        <span className='text-danger '>
                                            <i className="fas fa-exclamation-circle pr-1"></i>
                                            Minimum order value $15.00.</span>
                                    )}

                            </div>

                            <div>
                                <Button
                                    disabled={(this.state.cart.length === 0) ||
                                        (this.state.cart.length !== 0 &&
                                            (this.state.cart.map(eachItem => eachItem.quantity * eachItem.price).reduce((total, currentValue) => total + currentValue) < 15
                                                || this.state.time === '' || this.state.location === ''
                                            ))
                                    }
                                    className='bg-success w-100 mt-3 border-0'
                                    onClick={this.checkOut}
                                > <i className="fas fa-lock pr-1"
                                ></i> ORDER NOW</Button>
                            </div>

                            <div className='text-center mt-3'>
                                <img className='payment-type bitcoin mr-1 ' src={bitcoin} alt='bitcoin' />
                                <img className='payment-type' src={mastercard} alt='mastercard' />
                                <img className='payment-type' src={visa} alt='visa' />
                            </div>

                            <div>
                                <img className='img-fluid mt-3' src={zerocontact} alt='zero-contact-delivery' />
                            </div>
                        </div>


                    </Col>
                </Row>

            </div >
        )
    }
}

const mapStateToProps = state => ({
    data: state.menu
})


export default connect(mapStateToProps)(withRouter(FrontPage))