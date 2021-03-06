import React, { Component } from 'react';
import axios from 'axios';

import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

// import logo from './logo.svg';
// import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      message: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  async handleSubmit(e) {
    e.preventDefault();

    const {name, email, message} = this.state;

    const form  = await axios.post('/', {
      name,
      email,
      message
    })

  }

  render(){
    return (
      <div className="App">
        
        <Form onSubmit={this.handleSubmit} style={{ width: '600px' }}>
          <FormGroup>
            <Label for="name">Name: </Label>
            <Input 
              type="text"
              name="name"
              onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <Label for="email">Email: </Label>
            <Input 
              type="email"
              name="email"
              onChange={this.handleChange} />
          </FormGroup>

          {/* <FormGroup>
            <Label for="subject">Subject: </Label>
            <Input
              type="text"
              name="subject"
              onChange={this.handleChange} />
          </FormGroup> */}

          <FormGroup>
            <Label for="message">Message: </Label>
            <Input
              type="textarea"
              name="message"
              onChange={this.handleChange} />
          </FormGroup>

          <Button>Submit</Button>
        </Form>

      </div>
    );
  }
  
}
export default App;
