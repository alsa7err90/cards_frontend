import { useState } from "react";

export function useCPassword() {
  const [c_password, setCPassword] = useState("");

  const changeCPassword = (event) => {
    const password1 = event.target.value;
    setCPassword(password1);
  };

  return {
    c_password,
    setCPassword,
    changeCPassword,
  };
}
