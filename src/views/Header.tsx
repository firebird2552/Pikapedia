// React imports
import React from 'react'

//Library imports
import { Link } from 'react-router-dom'

// react-bootstrap imports

// custom imports

//functional react component
export const Header = () => {
    return (
        <div >
            <div>
                <Link to='/'>
                    <img src="./Pikapedia.png" alt="Pikapedia" className="mw-100 h-auto" width="315" height="100" />
                </Link>
                {/* <Nav>
                    <Nav.Link href="/Version1">Red/Blue</Nav.Link>
                </Nav> */}
            </div>
        </div>
    )
}

export default Header