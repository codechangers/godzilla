import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from '../../Spinner';
import autoBind from '../../../autoBind';
import '../../../assets/css/Parent-Dash.css';

class ClassSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  render() {
    return <p>welcome to the class sign up component</p>;
  }
}

export default ClassSignUp;
