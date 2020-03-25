
import React, { createContext, useContext } from "react";
import useRadioButtons from "../hooks/useRadioButtons";

const RadioGroupContext = createContext();

export function RadioGroup({ children, name, onChange }) {
  const [state, inputProps] = useRadioButtons(name);
  return (
    <RadioGroupContext.Provider value={inputProps}>
      {children}
    </RadioGroupContext.Provider>
  );
}

export function RadioButton(props) {
  const context = useContext(RadioGroupContext);
  return (
    <label>
      <input {...props} {...context} />
      {props.label}
    </label>
  );
}

