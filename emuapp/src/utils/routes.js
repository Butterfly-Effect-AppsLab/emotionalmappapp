import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import NewsPage from '../Pages/NewsPage';
import RegistrationPage from '../Pages/RegistrationPage';
import OnboardingPage from '../Pages/OnboardingPage';
import Loading from '../Components/Loading';
import LogInPage from '../Pages/LogInPage';


const Routes = () => (
  <>
    <Route exact path={'/'} component={NewsPage} />
    <Route exact path={'/onboarding'} component={OnboardingPage} />
    <Route exact path={'/registration'} component={RegistrationPage} />
    <Route exact path={'/login'} component={LogInPage} />


    <Route exact path={'/test'} component={Loading} />
    
  </>
);
export default withRouter(Routes);