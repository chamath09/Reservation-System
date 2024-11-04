import React, { Component } from "react";

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        time: new Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const colomboTime = this.state.time.toLocaleString("en-US", {
      timeZone: "Asia/Colombo",
      hour12: false,
    });

    const [date, time] = colomboTime.split(", ");
    const [hours, minutes, seconds] = time.split(":").map(Number);

    return (
      <div className="relative flex items-center justify-center w-full h-96 rounded-lg p-4">
        <div className="w-64 h-64 rounded-full shadow-lg bg-white relative flex items-center justify-center">
          <div
            className="absolute bg-gray-800 rounded-lg"
            style={{
              width: "6px",
              height: "30%",
              top: "20%",
              left: "50%",
              transform: `rotateZ(${(hours % 12) * 30}deg)`, 
              transformOrigin: "bottom",
            }}
          />
          <div
            className="absolute bg-gray-600 rounded-lg"
            style={{
              width: "4px",
              height: "40%",
              top: "10%",
              left: "50%",
              transform: `rotateZ(${minutes * 6}deg)`,
              transformOrigin: "bottom",
            }}
          />
          <div
            className="absolute bg-red-600"
            style={{
              width: "2px",
              height: "45%",
              top: "5%",
              left: "50%",
              transform: `rotateZ(${seconds * 6}deg)`,
              transformOrigin: "bottom",
            }}
          />
          <span className="absolute font-bold text-lg text-gray-600 top-1 left-1/2 transform -translate-x-1/2">12</span>
          <span className="absolute font-bold text-lg text-gray-600 top-1/2 right-6 transform -translate-y-1/2">3</span>
          <span className="absolute font-bold text-lg text-gray-600 bottom-4 left-1/2 transform -translate-x-1/2">6</span>
          <span className="absolute font-bold text-lg text-gray-600 top-1/2 left-6 transform -translate-y-1/2">9</span>
        </div>
      </div>
    );
  }
}
