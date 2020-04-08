import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../Components/Navbar.js';
import Footer from '../Components/Footer.js';

const useStyles = makeStyles({
    root: {
      height: '100%',
      display: 'block',
    }
  });

const Layout = ({children, history}) => {
    const classes = useStyles();

    return (
        <div id='layout.js' className={classes.root}>
            <Navbar history={history}/>
            {children}
            <Footer history={history}/>
        </div>
    )
};

export default Layout;