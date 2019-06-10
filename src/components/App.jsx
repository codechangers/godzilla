import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import HomePage from './HomePage';
import '../assets/css/App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={HomePage} />
      </Router>
    </div>
  );
};

export default App;
