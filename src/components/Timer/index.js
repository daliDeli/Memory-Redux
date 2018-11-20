import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

export const formatTime = time => {
  if (time < 0) {
    return "--:--";
  }

  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const mm = m < 10 ? `0${m}` : m;
  const s = time % 60;
  const ss = s < 10 ? `0${s}` : s;
  if (h > 0) {
    return [h, mm, ss].join(":");
  }
  return `${m}:${ss}`;
};

const Timer = ({ time = 0 }) => <div className="timer">{formatTime(time)}</div>;

Timer.propTypes = {
  time: PropTypes.number
};

class TimerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0
    };
  }

  componentDidUpdate(nextProps) {
    if (this.props.startTimer !== nextProps.startTimer) {
      if (this.props.startTimer) {
        this.interval = setInterval(this.tick.bind(this), 1000);
      } else {
        clearInterval(this.interval);
      }
    }

    if (this.props.resetTimer !== nextProps.resetTimer) {
      this.setState({ secondsElapsed: 0 });
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    });
  }

  render() {
    return <Timer time={this.state.secondsElapsed} />;
  }
}

export default TimerContainer;
