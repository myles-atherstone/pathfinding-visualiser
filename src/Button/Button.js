import React from "react";
import "./Button.css";

const button = ({ disabled, onClick, text }) => (
  <button className={"button"} onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

export default button;
