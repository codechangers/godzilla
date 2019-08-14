import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Logout from './Logout';
import '../../assets/css/NavBar.css';

const accountTypeToRoute = {
  '': '/',
  parents: '/parent',
  organizations: '/organization',
  teachers: '/teacher',
  admins: '/admin'
};

const collectionToLabel = {
  parents: 'Parent Dashboard',
  organizations: 'Organization Dashboard',
  teachers: 'Teacher Dashboard',
  admins: 'Admin Dashboard'
};

const NavBar = ({ accounts, firebase, location, getMenuButton }) => {
  const { parents } = accounts;
  const greeting = parents ? `Hello ${parents.data().fName}` : '';
  return (
    <nav className="nav-bar">
      {getMenuButton()}
      <div className="third">
        {Object.keys(accounts).map(account => {
          const path = accountTypeToRoute[account];
          const selected = location.pathname === path ? ' selected' : '';
          return (
            <Link to={path} key={account} className={`nav-link${selected}`}>
              {collectionToLabel[account]}
            </Link>
          );
        })}
      </div>
      <div className="third">
        <h1>{greeting}</h1>
      </div>
      <div className="third">
        <Logout firebase={firebase} />
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  accounts: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getMenuButton: PropTypes.func
};

NavBar.defaultProps = {
  getMenuButton: () => null
};

export default withRouter(NavBar);
