import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';

const useStyles = makeStyles({
  root: {
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  }
});

const Layout = ({ children, history }) => {
  const [showHeader, setShowHeader] = React.useState(1);
  const [showFooter, setShowFooter] = React.useState(1);
  const classes = useStyles();

  useEffect(() => {
    const processPathName = (pathname) => {
      switch (pathname) {
        case "/registration":
          setShowHeader(0);
          setShowFooter(0);
          break;
        case "/onboarding":
          setShowHeader(0);
          setShowFooter(0);
          break;
        default:
          setShowHeader(1);
          setShowFooter(1);
          break;
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
    <div id='layout.js' className={classes.root}>
      <Header history={history} showHeader={showHeader} />
      {children}
      <Footer history={history} showFooter={showFooter} />
    </div>
  )
};

export default Layout;