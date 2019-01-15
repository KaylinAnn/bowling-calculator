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
      "frame-10": { "ball-1": null, "ball-2": null, "ball-3": null }
    };
  }
  isStrike(frame) {
    return frame[0] === 10;
  }

  isSpare(frame) {
    return frame[0] + frame[1] === 10;
  }

  isLast(frame) {
    return frame.length === 3;
  }
  sumFrame(frame) {
    return frame.reduce((prev, curr) => prev + curr, 0);
  }

  getNext2(frames, i) {
    // if this is the last frame
    if (i == frames.length - 1) {
      // add next two balls
      console.log(frames);
      console.log(frames[i][1] + frames[i][2]);
      return frames[i][1] + frames[i][2];
      //if this is the second to last frame
    } else if (i >= frames.length - 2) {
      // add the next two balls from the last frame
      return frames[i + 1][0] + frames[i + 1][1];
    } else {
      // add the next two balls. If strike, go to next frame
      return this.isStrike(frames[i + 1])
        ? 10 + frames[i + 2][0]
        : this.sumFrame(frames[i + 1]);
    }
  }

  getNext1(frames, i) {
    return i >= frames.length - 1 ? frames[i][2] : frames[i + 1][0];
  }

  calculateScores() {
    let frames = Object.keys(this.state).map((frame, i) => {
      return i === Object.keys(this.state).length - 1
        ? [
            this.state[frame]["ball-1"],
            this.state[frame]["ball-2"],
            this.state[frame]["ball-3"]
          ]
        : [this.state[frame]["ball-1"], this.state[frame]["ball-2"]];
    });

    let scores = frames.map((frame, i) => {
      if (this.isStrike(frame)) {
        return 10 + this.getNext2(frames, i);
      } else if (this.isSpare(frame)) {
        return 10 + this.getNext1(frames, i);
      } else {
        return this.sumFrame(frame);
      }
    });
    return scores;
  }

  render() {
    const scores = this.calculateScores();
    const total = scores.reduce((prev, curr) => prev + curr, 0);
    const frames = [...Array(9).keys()].map(i => {
      return (
        <div className="frame">
          <input
            onChange={e => {
              this.setState({
                [`frame-${i + 1}`]: {
                  "ball-1": Number(e.target.value),
                  "ball-2":
                    Number(e.target.value) === 10
                      ? null
                      : this.state[`frame-${i + 1}`]["ball-2"]
                }
              });
            }}
            className="frame-input"
            type="number"
            min="1"
            max="10"
          />
          <input
            onChange={e => {
              this.setState({
                [`frame-${i + 1}`]: {
                  "ball-1": this.state[`frame-${i + 1}`]["ball-1"],
                  "ball-2": Number(e.target.value)
                }
              });
            }}
            className={`frame-input ${
              this.state[`frame-${i + 1}`]["ball-1"] === 10
                ? "input-disabled"
                : ""
            }`}
            type="number"
            min="1"
            max="10"
          />
          <div>{scores[i]}</div>
        </div>
      );
    });

    const lastFrame = (
      <div className="frame">
        <input
          onChange={e => {
            this.setState({
              ["frame-10"]: {
                "ball-1": Number(e.target.value),
                "ball-2": this.state["frame-10"]["ball-2"],
                "ball-3":
                  Number(e.target.value) === 10 ||
                  Number(e.target.value) +
                    Number(this.state["frame-10"]["ball-2"]) ===
                    10
                    ? this.state["frame-10"]["ball-3"]
                    : null
              }
            });
          }}
          className="frame-input"
          type="number"
          min="1"
          max="10"
        />
        <input
          onChange={e => {
            this.setState({
              [`frame-10`]: {
                "ball-1": this.state[`frame-10`]["ball-1"],
                "ball-2": Number(e.target.value),
                "ball-3":
                  Number(e.target.value) === 10 ||
                  Number(this.state["frame-10"]["ball-1"]) +
                    Number(e.target.value) ===
                    10
                    ? this.state["frame-10"]["ball-3"]
                    : null
              }
            });
          }}
          className="frame-input"
          type="number"
          min="1"
          max="10"
        />
        <input
          onChange={e => {
            this.setState({
              ["frame-10"]: {
                "ball-1": this.state["frame-10"]["ball-1"],
                "ball-2": this.state["frame-10"]["ball-2"],
                "ball-3":
                  this.state["frame-10"]["ball-1"] === 10 ||
                  Number(this.state["frame-10"]["ball-1"]) +
                    Number(this.state["frame-10"]["ball-2"]) ===
                    10
                    ? Number(e.target.value)
                    : null
              }
            });
          }}
          className={`frame-input ${
            this.state["frame-10"]["ball-1"] === 10 ||
            Number(this.state["frame-10"]["ball-1"]) +
              Number(this.state["frame-10"]["ball-2"]) ===
              10
              ? ""
              : "input-disabled"
          }`}
          type="number"
          min="1"
          max="10"
        />
        <div>{scores[9]}</div>
      </div>
    );

    return (
      <div className="App">
        <h1>Bowling Calculator</h1>
        <div className="frame-container">
          {frames}
          {lastFrame}
        </div>
        {/* <div>
          <button onClick={() => this.calculateScore()}>Submit Score</button>
        </div> */}
        <div className="total">Score:{total}</div>
      </div>
    );
  }
}

export default App;
