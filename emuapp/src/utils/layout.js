import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    height: '100%',
    // overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  childrenOverflow: {
    minHeight: '200px',
    overflow: 'auto',
    flexGrow: 1,
    
  },
  box: {
    height: '100%',
  }
});

const Layout = ({ children, history }) => {
  const [showHeader, setShowHeader] = React.useState(1);
  const [showFooter, setShowFooter] = React.useState(1);
  const classes = useStyles();

  useEffect(() => {
    const processPathName = (pathname) => {
      if (pathname.indexOf('/registration') !== -1) {
        setShowHeader(0);
        setShowFooter(0);
      }
      else if (pathname.indexOf('/surveys/') !== -1) {
        setShowFooter(0);
      }
      else {
        switch (pathname) {
          case '/onboarding':
            setShowHeader(0);
            setShowFooter(0);
            break;
          case '/test':
            setShowHeader(0);
            setShowFooter(0);
            break;
          case '/login':
            setShowHeader(0);
            setShowFooter(0);
            break;
          default:
            setShowHeader(1);
            setShowFooter(1);
            break;
        }
      }
    };
    if (history) {
      processPathName(history.location.pathname);
      history.listen((location) => {
        processPathName(location.pathname);
      });
    }
  }, [history]);

  return (
    <div className={classes.root}>
      <Box className={classes.box} display="flex" flexDirection="column">
        <Header history={history} showHeader={showHeader} />
        <div className={classes.childrenOverflow}>{children}</div>
        <Footer history={history} showFooter={showFooter} />
      </Box>
    </div>
  );
};

export default Layout;