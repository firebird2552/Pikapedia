// React imports
import React from 'react'
import Image from 'next/Image'


//Library imports
import Navbar from 'react-bootstrap/Navbar'

// custom imports

//functional react component
const Header = () => {
    return (
        <Navbar bg="light">
            <Navbar.Brand><Image src="/pikapedia.png" alt="Pikapedia" width="315" height="100" /></Navbar.Brand>
        </Navbar>

    )
}
export default Header