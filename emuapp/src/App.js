import React from 'react';
import { Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider, Hidden } from "@material-ui/core";
import './App.css';
import history from './utils/history';
import Routes from './utils/routes';
import Layout from './utils/layout';
import { RED } from './utils/colours';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: RED
    }
  },
  typography: {
      fontFamily: "\"Roboto\", sans-serif",
    }
  });


const useStyles = makeStyles({
  baseDiv: {
    height: '100vh',
    // overflow: 'hidden',
  },

});

const App = () => {
  const classes = useStyles();

  return (
    <div id='App.js' className={classes.baseDiv}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Layout history={history}>
            <Routes />
          </Layout>
        </Router>
      </MuiThemeProvider>
    </div>
  )
};

export default App;
