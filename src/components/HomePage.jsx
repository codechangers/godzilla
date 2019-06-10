import React from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/css/HomePage.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const HomePage = () => (
  <div className="HomePage-banner">
    <div className="overlay banner">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Hello New Platform</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default HomePage;
