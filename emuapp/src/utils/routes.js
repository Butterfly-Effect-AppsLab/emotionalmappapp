import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import NewsPage from '../Pages/NewsPage';
import RegistrationPage from '../Pages/RegistrationPage';
import OnboardingPage from '../Pages/OnboardingPage';
import ReduxTest from '../Pages/ReduxTest';



const Routes = () => (
  <>
    <Route exact path={'/'} component={NewsPage} />
    <Route exact path={'/registration'} component={RegistrationPage} />
    <Route exact path={'/onboarding'} component={OnboardingPage} />

    <Route exact path={'/test'} component={ReduxTest} />
    
  </>
);
export default withRouter(Routes);