import { useState } from "react";

export function useTypeAccount() {
  const [typeAccount, setTypeAccount] = useState("Personal");

  const changeTypeAccount = (e) => {
    const type = e.target.value;
    setTypeAccount(type);
  };

  return {
    typeAccount,
    changeTypeAccount,
  };
}
