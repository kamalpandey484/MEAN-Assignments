import React, { Component } from 'react';
import Studentslist from './studentslist';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="App">

        <Studentslist/>
      </div>
    );
  }
}

export default App;
