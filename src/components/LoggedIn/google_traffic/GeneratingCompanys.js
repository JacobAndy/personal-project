import React from "react";
import CircularProgress from "material-ui/CircularProgress";
import "../google_directions/LoadingBar.css";

const CircularProgressExampleSimple = () => (
  <div className="loading">
    <h3>
      <span className="letter-bounce-0">G</span>
      <span className="letter-bounce-1">e</span>
      <span className="letter-bounce-2">n</span>
      <span className="letter-bounce-3">e</span>
      <span className="letter-bounce-4">r</span>
      <span className="letter-bounce-5">a</span>
      <span className="letter-bounce-6">t</span>
      <span className="letter-bounce-7">i</span>
      <span className="letter-bounce-8">n</span>
      <span className="letter-bounce-9">g</span>
      <span className="letter-bounce-10"> C</span>
      <span className="letter-bounce-11">o</span>
      <span className="letter-bounce-12">m</span>
      <span className="letter-bounce-13">p</span>
      <span className="letter-bounce-14">a</span>
      <span className="letter-bounce-15">n</span>
      <span className="letter-bounce-16">y</span>
      <span className="letter-bounce-17">s</span>
      <span className="letter-bounce-18">!</span>
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
