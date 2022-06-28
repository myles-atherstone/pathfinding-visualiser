import React, { useEffect, useState } from "react";
import "./Select.css";

function Dropdown(props) {
  const [selectedValue, setSelectedValue] = useState(props.defaultValue);

  const options = props.options.map((option, index) => (
    <option key={index} value={option.value}>
      {option.text}
    </option>
  ));

  useEffect(
    () => props.onChange(selectedValue),
    // eslint-disable-next-line
    [selectedValue]
  );

  useEffect(() => {
    if (props.update) {
      setSelectedValue("none");
    }
  }, [props]);

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  return (
    <div className={"selectContainer"}>
      <div className={"selectLabel"}>{props.text}</div>
      <div className={"select"}>
        <select
          id={props.id}
          value={selectedValue}
          onChange={handleChange}
          disabled={props.disabled}
        >
          {options}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
