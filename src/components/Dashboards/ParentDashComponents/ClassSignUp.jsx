import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from '../../Spinner';
import autoBind from '../../../autoBind';
import '../../../assets/css/Parent-Dash.css';

const ClassId = ({ match }) => (
  <div>
    <h3>
      Class ID:
      {match.params.id}
    </h3>
  </div>
);

class ClassSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classId: ''
    };
    autoBind(this);
  }

  // componentDidMount() {
  //   const urlParams = window.location.pathname;
  //   this.setState({
  //     classId: urlParams
  //   });
  // }

  render() {
    const urlParams = window.location.pathname.slice(8);

    // this.setState({
    //   classId: urlParams
    // });
    return (
      <div>
        <h3>Welcome to the class sign up component</h3>
        <Link to="/parent/classid">class id link</Link>
        {urlParams === '' ? (
          <p>no url i see...</p>
        ) : (
          <p>
            nice! youre id is:
            {urlParams}
          </p>
        )}
      </div>
    );
  }
}

export default ClassSignUp;
