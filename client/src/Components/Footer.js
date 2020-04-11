import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

class Footer extends Component {
    render() {
        let date = new Date();

        return (

            <footer className="  text-center mt-3 py-3">
                <Row>


                    <Col>
                        <div className="my-3 flex-center ">

                            <a href='#' className="fb-ic text-dark">
                                <i className="fab fa-facebook-f fa-lg mr-md-5 mr-3 fa-2x"> </i>
                            </a>

                            <a href='#' className="tw-ic text-dark">
                                <i className="fab fa-twitter fa-lg mr-md-5 mr-3 fa-2x"> </i>
                            </a>

                            <a href='#' className="gplus-ic text-dark">
                                <i className="fab fa-google-plus-g fa-lg mr-md-5 mr-3 fa-2x"> </i>
                            </a>

                            <a href='#' className="li-ic text-dark">
                                <i className="fab fa-linkedin-in fa-lg mr-md-5 mr-3 fa-2x"> </i>
                            </a>

                            <a href='#' className="ins-ic text-dark">
                                <i className="fab fa-instagram fa-lg mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            <a href='#' className="pin-ic text-dark">
                                <i className="fab fa-pinterest fa-lg fa-2x"> </i>
                            </a>
                        </div>
                    </Col>



                </Row>

                <div className="footer-copyright text-center ">© 2020 Copyright:
                <a href="https://glenroypizza.com/"> glenroypizza.com</a>
                </div>

            </footer>
        )
    }
}

export default Footer