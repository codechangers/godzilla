import React from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/css/HomePage.css';

const HomePage = () => (
  <div className="HomePage-banner">
    <div className="overlay banner">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Hello New Platform</h1>
    </div>
  </div>
);

export default HomePage;
