import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import './App.css';
import history from './utils/history';
import Routes from './utils/routes';
import Layout from './utils/layout';


class App extends Component {

  render() {
    return (
      <div id='App.js'>
        <Router history={history}>
          <Layout history={history}>
            <Routes/>
          </Layout>
        </Router>
      </div>
    )
  }

}
export default App;
