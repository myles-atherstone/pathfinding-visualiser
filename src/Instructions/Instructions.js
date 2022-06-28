import React, { useState } from "react";
import "./Instructions.css";

const Instructions = () => {
  const [show, setShow] = useState(true);
  return (
    <div
      className="instructions"
      style={{ display: show ? "inherit" : "none" }}
    >
      <h2>Instructions</h2>
      1. Click and drag on the grid to draw obstacles.
      <br />
      2. Drag the <i style={{ color: "palegreen", fontWeight: "600" }}>
        green
      </i>{" "}
      node to set the start position.
      <br />
      3. Drag the <i style={{ color: "salmon", fontWeight: "600" }}>red</i> node
      to set the target position.
      <br />
      4. Choose your settings from the above toolbar.
      <br />
      5. Click Visualise to start!
      <br />
      <br />
      <button onClick={() => setShow(false)}>Close</button>
    </div>
  );
};

export default Instructions;
