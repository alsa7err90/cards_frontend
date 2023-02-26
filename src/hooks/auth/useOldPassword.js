import { useState } from "react";

export function useOldPassword() {
  const [oldPassword, setOldPassword] = useState("");

  const changeOldPassword = (event) => {
    const password1 = event.target.value;
    setOldPassword(password1);
  };

  return {
    oldPassword,
    setOldPassword,
    changeOldPassword,
  };
}
