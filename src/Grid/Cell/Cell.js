import React from "react";
import "./Cell.css";

const Cell = React.forwardRef((props, ref) => {
  return (
    <td
      className={"cell"}
      ref={ref}
      onMouseDown={(event) => props.onMouseDown(event, props.index)}
      onMouseEnter={(event) => props.onMouseEnter(event, props.index)}
      onMouseUp={(event) => props.onMouseUp(event, props.index)}
    />
  );
});

export default Cell;
