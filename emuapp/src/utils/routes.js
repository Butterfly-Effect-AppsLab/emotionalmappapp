import React, { useEffect } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NewsPage from '../Pages/NewsPage';
import RegistrationPage from '../Pages/RegistrationPage';
import OnboardingPage from '../Pages/OnboardingPage';
import Loading from '../Components/Loading';
import LogInPage from '../Pages/LogInPage';
import SurveysPage from '../Pages/SurveysPage';
import history from '../utils/history';
import SurveyPage from '../Pages/SurveyPage';


   const renderSurvey = (id) => {
    return(<SurveyPage id={id} />)
  }

  const renderRegistration = (id) => {
    return(<RegistrationPage id={id} />)
  }

const Routes = () => (
  <>
    <Route exact path={'/'} component={NewsPage} />
    <Route exact path={'/onboarding'} component={OnboardingPage} />
    <Route exact path={'/registration'} component={RegistrationPage} />
    <Route exact path={'/login'} component={LogInPage} />
    <Route exact path={'/surveys'} component={SurveysPage} />
    <Route path ={'/surveys/:id'} render={routerProps => renderSurvey(routerProps.match.params.id)} />



    <Route exact path={'/test'} component={Loading} />

  </>
);
export default withRouter(Routes);