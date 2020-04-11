import React, { Component } from 'react'
import NavBar from './NavBar'
import FrontPage from './FrontPage'
import Footer from './Footer'

export default class MainPage extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <FrontPage />
                <Footer />
            </div>
        )
    }
}
