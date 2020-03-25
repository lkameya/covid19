import { useState } from "react";

function useRadioButtons(name) {
  const [value, setState] = useState(null);

  const handleChange = event => {
    setState(event.target.value);
  };

  const inputProps = {
    onChange: handleChange,
    name,
    type: "radio"
  };

  return [value, inputProps];
}

export default useRadioButtons;