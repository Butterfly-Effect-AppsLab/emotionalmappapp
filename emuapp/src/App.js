import React from 'react';
import { Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import history from './utils/history';
import Routes from './utils/routes';
import Layout from './utils/layout';

const useStyles = makeStyles({
  baseDiv: {
    height: '100%',
    position: 'absolute',
  }
});

const App = () => {
  const classes = useStyles();

    return (
      <div id='App.js' className={classes.baseDiv}>
        <Router history={history}>
          <Layout history={history}>
            <Routes/>
          </Layout>
        </Router>
      </div>
    )
};

export default App;
