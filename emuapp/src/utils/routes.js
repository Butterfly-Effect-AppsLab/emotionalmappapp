import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import NewsPage from '../Pages/NewsPage';
import ReduxTest from '../Pages/ReduxTest';


const Routes = () => (
  <>
    <Route exact path={'/'} component={NewsPage} />
    <Route exact path={'/test'} component={ReduxTest} />
    
  </>
);
export default withRouter(Routes);