import { useState } from "react";

export function useUsername() {
  const [username, setUsername] = useState("");

  const changeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  return {
    username,
    setUsername,
    changeUsername,
  };
}
