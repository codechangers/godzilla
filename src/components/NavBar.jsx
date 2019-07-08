import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/NavBar.css';

const NavBar = ({ accounts }) => {
  const { parents } = accounts;
  console.log(accounts);
  return parents !== null ? (
    <nav className="nav-bar">
      <h1>{`Hello ${parents.data().fName}`}</h1>
    </nav>
  ) : null;
};

NavBar.propTypes = {
  accounts: PropTypes.object.isRequired
};

export default NavBar;
