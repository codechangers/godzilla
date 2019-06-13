import React from 'react';

const Logout = ({ firebase }) => <button onClick={() => firebase.auth().signOut()}>LogOut</button>;

export default Logout;
