import React from "react";
import CircularProgress from "material-ui/CircularProgress";
import "../../google_directions/LoadingBar.css";

const CircularProgressSimple = () => (
  <div className="loading">
    <h3>
      <span className="letter-bounce-0">C</span>
      <span className="letter-bounce-1">r</span>
      <span className="letter-bounce-2">e</span>
      <span className="letter-bounce-3">a</span>
      <span className="letter-bounce-4">t</span>
      <span className="letter-bounce-5">i</span>
      <span className="letter-bounce-6">n</span>
      <span className="letter-bounce-7">g</span>
      <span className="letter-bounce-8"> Y</span>
      <span className="letter-bounce-9">o</span>
      <span className="letter-bounce-10">u</span>
      <span className="letter-bounce-11">r</span>
      <span className="letter-bounce-12"> E</span>
      <span className="letter-bounce-13">x</span>
      <span className="letter-bounce-14">p</span>
      <span className="letter-bounce-15">e</span>
      <span className="letter-bounce-16">r</span>
      <span className="letter-bounce-17">i</span>
      <span className="letter-bounce-18">e</span>
      <span className="letter-bounce-19">n</span>
      <span className="letter-bounce-21">c</span>
      <span className="letter-bounce-22">e</span>
      <span className="letter-bounce-23">!</span>
    </h3>
    <CircularProgress
      color="#01579b"
      className="loading-circle"
      size={140}
      thickness={12}
    />
  </div>
);

export default CircularProgressSimple;
