import React, { Component } from 'react'
import {
    Col,
    Row,

} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'
import { getResData } from '../actions/menuActions'

class Landing extends Component {
    componentDidMount() {
        this.props.getResData()

    }

    render() {
        return (
            <div className='position-relative' >
                <div className="masthead">
                    <Fade>
                        <Row>
                            <Col>
                                <h1 className='motto'>
                                    <span className='text-danger '>
                                        {this.props.data.restaurantData.restaurant_name}
                                    </span>
                                    <br />
                                    <span className='text-light '>
                                        {this.props.data.restaurantData.restaurant_street},
                                        <br />
                                        {this.props.data.restaurantData.restaurant_citystate}
                                    </span>

                                </h1>
                            </Col>
                        </Row>
                    </Fade>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.menu
})
export default connect(mapStateToProps, { getResData })(Landing)