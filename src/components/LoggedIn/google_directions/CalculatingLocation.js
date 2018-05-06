import React from "react";
import CircularProgress from "material-ui/CircularProgress";
import "./LoadingBar.css";

const CircularProgressExampleSimple = () => (
  <div className="loading">
    <h3>
      <span className="letter-bounce-0">C</span>
      <span className="letter-bounce-1">a</span>
      <span className="letter-bounce-2">l</span>
      <span className="letter-bounce-3">c</span>
      <span className="letter-bounce-4">u</span>
      <span className="letter-bounce-5">l</span>
      <span className="letter-bounce-6">a</span>
      <span className="letter-bounce-7">t</span>
      <span className="letter-bounce-8">i</span>
      <span className="letter-bounce-9">n</span>
      <span className="letter-bounce-10">g</span>
      <span className="letter-bounce-11"> L</span>
      <span className="letter-bounce-12">o</span>
      <span className="letter-bounce-13">c</span>
      <span className="letter-bounce-14">a</span>
      <span className="letter-bounce-15">t</span>
      <span className="letter-bounce-16">i</span>
      <span className="letter-bounce-17">o</span>
      <span className="letter-bounce-18">n</span>
      <span className="letter-bounce-19">!</span>
    </h3>
    <CircularProgress
      color="#01579b"
      className="loading-circle"
      size={140}
      thickness={12}
    />
  </div>
);

export default CircularProgressExampleSimple;
