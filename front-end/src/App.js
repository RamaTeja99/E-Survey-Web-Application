import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashBoard from './components/DashBoard';
import AddSurvey from './components/Survey';
import SurveyList from './components/Survey/SurveyList';
import PhoneAuth from './components/PhoneAuth.js';
import Plans from'./components/Plans.js';
import PaymentPage from './components/Payment.js';
import SubmitSurveyPage from './components/SurveySubmissionPage.js';
function App() {
  return (
    // Provide the Redux store to the application
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            // Render Home component for root route
            <Route exact path="/" component={Home} />
            // Render Login component for /login route
            <Route exact path="/login" component={Login} />
            // Render Register component for /register route
            <Route exact path="/register" component={Register} />
            // Render DashBoard component for /dashboard route
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/addSurvey" component={AddSurvey} />
            <Route exact path="/phoneAuth" component={PhoneAuth} />
            <Route exact path="/plans" component={Plans}/>
            <Route path="/payment" component={PaymentPage} />
            <Route path="/submitSurvey/:formId" component={SubmitSurveyPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
