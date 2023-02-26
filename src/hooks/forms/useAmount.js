import { useState } from "react";

export function useAmount() {
  const [amount, setAmount] = useState();

  const changeAmount = (event) => {
    const amount = event.target.value;
    setAmount(amount);
  };

  return {
    amount,
    changeAmount,
  };
}
