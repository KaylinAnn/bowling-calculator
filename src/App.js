import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      scores: [
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null]
      ]
    };
  }
  render() {
    return (
      <div className="App">
        <h1>Bowling Calculator</h1>
        <div className="frame-container">
          <div className="frame frame-one" />
          <div className="frame frame-two" />
          <div className="frame frame-three" />
          <div className="frame frame-four" />
          <div className="frame frame-five" />
          <div className="frame frame-six" />
          <div className="frame frame-seven" />
          <div className="frame frame-eight" />
          <div className="frame frame-nine" />
          <div className="frame frame-ten" />
        </div>
      </div>
    );
  }
}

export default App;
