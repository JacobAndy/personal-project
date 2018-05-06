import React from "react";
import CircularProgress from "material-ui/CircularProgress";
import "../google_directions/LoadingBar.css";

const CircularProgressExampleSimples = () => (
  <div className="loading-jobs">
    <h3>
      <span className="letter-bounce-0">G</span>
      <span className="letter-bounce-1">e</span>
      <span className="letter-bounce-2">t</span>
      <span className="letter-bounce-3">t</span>
      <span className="letter-bounce-4">i</span>
      <span className="letter-bounce-5">n</span>
      <span className="letter-bounce-6">g</span>
      <span className="letter-bounce-7"> A</span>
      <span className="letter-bounce-8">l</span>
      <span className="letter-bounce-9">l</span>
      <span className="letter-bounce-10"> J</span>
      <span className="letter-bounce-11">o</span>
      <span className="letter-bounce-12">b</span>
      <span className="letter-bounce-13">s</span>
      <span className="letter-bounce-14">!</span>
    </h3>
    <CircularProgress
      color="#01579b"
      className="loading-circle"
      size={140}
      thickness={8}
    />
  </div>
);

export default CircularProgressExampleSimples;
