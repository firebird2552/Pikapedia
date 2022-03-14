// React imports
import React from 'react'
import Logo from '../pikapedia.png'


//Library imports
import { Link } from 'react-router-dom'

// react-bootstrap imports
import Navbar from 'react-bootstrap/Navbar'

// custom imports

//functional react component
const Header = () => {
    return (
        <Navbar bg="light">
            <Navbar.Brand><Link to='/'><img src={Logo} alt="Pikapedia" className="mw-100 h-auto" width="315" height="100" /></Link></Navbar.Brand>
        </Navbar>
    )
}

export default Header