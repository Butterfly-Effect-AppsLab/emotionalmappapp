import React from 'react';
import Navbar from '../Components/Navbar.js';

const Layout = ({children, history}) => {

    return (
        <>
            <Navbar history={history}/>
            {children}
        </>
    )
};

export default Layout;