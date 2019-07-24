import React from 'react';
import { Card, CardHeader, CardContent, TextField } from '@material-ui/core';
import autoBind from '../../autoBind';

class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    autoBind(this);
  }

  handleInput(e) {
    const newState = this.state;
    newState[e.target.id] = e.target.value;
    this.setState({ ...newState });
  }

  render() {
    return (
      <Card style={{ width: '80%', height: '50vh' }}>
        <CardHeader title="Create a Class" />
        <CardContent>
          <TextField
            id="name"
            type="text"
            label="Class Name"
            variant="outlined"
            value={this.state.name}
            onChange={this.handleInput}
          />
        </CardContent>
      </Card>
    );
  }
}

export default CreateClass;
