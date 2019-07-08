import React from 'react';
import PropTypes from 'prop-types';
import Logout from './Logout';
import '../assets/css/NavBar.css';

const NavBar = ({ accounts, firebase }) => {
  const { parents } = accounts;
  let greeting = '';
  if (parents) {
    greeting = `Hello ${parents.data().fName}`;
  }
  console.log(accounts);
  return (
    <nav className="nav-bar">
      <h1>{greeting}</h1>
      <Logout firebase={firebase} />
    </nav>
  );
};

NavBar.propTypes = {
  accounts: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

export default NavBar;
