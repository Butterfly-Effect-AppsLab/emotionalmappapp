import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import NewsPage from '../Pages/NewsPage';


const Routes = () => (
  <>
    <Route exact path={'/'} component={NewsPage} />
    
  </>
);
export default withRouter(Routes);