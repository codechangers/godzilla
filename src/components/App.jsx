import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import AdminDashboard from './Dashboards/Admin';
import Parent from './Dashboards/Parent';
import TrainingTeacher from './Dashboards/TeacherInTraining';
import Teacher from './Dashboards/TeacherOutOfTraining';
import Organization from './Dashboards/Organization';
import '../assets/css/App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/parent" component={Parent} />
        <Route path="/trainingteacher" component={TrainingTeacher} />
        <Route path="/teacher" component={Teacher} />
        <Route path="/organization" component={Organization} />
      </Router>
    </div>
  );
};

export default App;
