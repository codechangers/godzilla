import React from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/css/App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello New Platform
        </p>
      </header>
    </div>
  );
}

export default App;
