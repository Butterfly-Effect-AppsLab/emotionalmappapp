import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';

const useStyles = makeStyles({
    root: {
      height: '100vh',
      // display: 'block',
    }
  });

const Layout = ({children, history}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar history={history}/>
            {children}
            <Footer history={history}/>
        </div>
    )
};

export default Layout;