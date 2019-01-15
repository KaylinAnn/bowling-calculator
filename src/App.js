import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      "frame-1": { "ball-1": null, "ball-2": null },
      "frame-2": { "ball-1": null, "ball-2": null },
      "frame-3": { "ball-1": null, "ball-2": null },
      "frame-4": { "ball-1": null, "ball-2": null },
      "frame-5": { "ball-1": null, "ball-2": null },
      "frame-6": { "ball-1": null, "ball-2": null },
      "frame-7": { "ball-1": null, "ball-2": null },
      "frame-8": { "ball-1": null, "ball-2": null },
      "frame-9": { "ball-1": null, "ball-2": null },
      "frame-10": { "ball-1": null, "ball-2": null }
    };
  }

  calculateScore() {
    console.log(this.state);
  }

  render() {
    const frames = [...Array(10).keys()].map(i => {
      return (
        <div className="frame">
          <input
            onChange={e => {
              this.setState({
                [`frame-${i + 1}`]: {
                  "ball-1": e.target.value,
                  "ball-2":
                    e.target.value == 10
                      ? null
                      : this.state[`frame-${i + 1}`]["ball-2"]
                }
              });
            }}
            className="frame-input"
            type="text"
          />
          <input
            onChange={e => {
              this.setState({
                [`frame-${i + 1}`]: {
                  "ball-1": this.state[`frame-${i + 1}`]["ball-1"],
                  "ball-2": e.target.value
                }
              });
            }}
            className={`frame-input ${
              this.state[`frame-${i + 1}`]["ball-1"] == 10
                ? "input-disabled"
                : ""
            }`}
            type="text"
          />
          <div>{this.state[`frame-${i + 1}`]["ball-1"]}</div>
        </div>
      );
    });

    return (
      <div className="App">
        <h1>Bowling Calculator</h1>
        <div className="frame-container">{frames}</div>
        <div>
          <button onClick={() => this.calculateScore()}>Submit Score</button>
        </div>
      </div>
    );
  }
}

export default App;
