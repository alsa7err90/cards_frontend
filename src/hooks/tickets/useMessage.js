import { useState } from "react";

export function useMessage() {
  const [message, setMessage] = useState("");

  const changeMessage = (event) => {
    const message = event.target.value;
    setMessage(message);
  };
  
  return {
    message,
    changeMessage,
  };
}
