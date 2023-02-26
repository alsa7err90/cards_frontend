import { useState } from "react";

export function useReceiver() {
  const [receiver, setReceiver] = useState("");

  const changeReceiver = (event) => {
    const email = event.target.value;
    setReceiver(email);
  };

  return {
    receiver,
    changeReceiver,
  };
}
