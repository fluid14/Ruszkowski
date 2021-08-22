import React from 'react';

const Navbar = ({ children }) => {
    return (
        <nav>
            {/*<img src="../../../../static/images/logo_ruszkowski.png" alt="Ruszkowski.biz"/>*/}
            {{ children }}
        </nav>
    );
};

export default Navbar;
