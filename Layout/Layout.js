// React imports
import React from 'react'

//Library imports

// custom imports
import Header from '../Components/Header'

//functional react component
const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    )
}
export default Layout