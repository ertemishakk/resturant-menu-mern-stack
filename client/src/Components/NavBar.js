import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand,
} from 'reactstrap';
import HamburgerMenu from 'react-hamburger-menu'
import logo from '../images/logo.png'
import Spy from 'react-scrollspy-nav'
import { connect } from 'react-redux'

class NavBar extends Component {
    state = {
        isOpen: false,
        offsetY: 0,
        slide: 0,
        lastScrollY: 0,
        windowWidth: 0
    }
    componentDidMount() {
        this.setState({
            windowWidth: window.innerWidth,
        })
        window.addEventListener('resize', this.updateWindowDimension);
        window.addEventListener('scroll', this.listenToScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimension);
        window.removeEventListener('scroll', this.listenToScroll)

    }
    updateWindowDimension = (e) => {
        this.setState({
            windowWidth: window.innerWidth
        })
    }


    listenToScroll = () => {
        this.setState({
            offsetY: window.pageYOffset
        })
        const { lastScrollY } = this.state;
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            this.setState({ slide: '-100px' });
        } else {
            this.setState({ slide: '0px' });
        }
        this.setState({ lastScrollY: currentScrollY });
    }

    toggle = (e) => {
        if (this.state.innerWidth !== null && this.state.windowWidth < 768) {
            this.setState({
                isOpen: !this.state.isOpen
            })
        }
    }

    render() {
        return (
            <div>
                <Spy
                    scrollTargetIds={this.props.data.menuData.map(each => each[each.menu_title])}
                    offset={250}
                    activeNavClass="is-active"
                    scrollDuration="250"
                    headerBackground="true"
                >
                    <Navbar style={{
                        transform: this.state.offsetY > 370 && `translate(0, ${this.state.slide})`,
                        transition: this.state.offsetY > 370 && 'transform 0.2s linear',
                        zIndex: 4
                    }}
                        expand="md" dark className={this.state.offsetY > 293 ? ` fixed-top bg-light border-bottom` : 'bg-light border-bottom '}
                    >
                        <NavbarToggler onClick={this.toggle} className='border-0 mt-2 float-right'>
                            <HamburgerMenu
                                isOpen={this.state.isOpen}
                                navbar
                                menuClicked={this.toggle}
                                borderRadi={0}
                                animationDuration={0.5}
                            />
                        </NavbarToggler>
                        <NavbarBrand href='/' className='text-dark mx-auto pr-5 d-md-none'>
                            <img src={logo} alt='glenroy pizza logo' style={{ height: '60px' }} />
                            GLENROY PIZZA</NavbarBrand>

                        <Collapse isOpen={this.state.isOpen} navbar className='text-center'>
                            <Nav className="mx-auto navigation " navbar>
                                {this.props.data.menuData.map((eachMenu, index) => (
                                    <NavItem key={index}>
                                        <NavLink
                                            onClick={() => {
                                                this.toggle();
                                            }}
                                            className='text-dark '
                                            href={'#' + eachMenu.menu_title}
                                        >
                                            {eachMenu.menu_title}
                                        </NavLink>
                                    </NavItem>
                                ))}
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Spy>
            </div >
        )
    }
}


const mapStateToProps = state => ({
    data: state.menu
})
export default connect(mapStateToProps)(NavBar)