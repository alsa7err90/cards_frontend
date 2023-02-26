import { useState } from "react";

export function useLogPassword() {
  const [password, setPassword] = useState("");
  const changePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  return {
    password,
    setPassword,
    changePassword,
  };
}
