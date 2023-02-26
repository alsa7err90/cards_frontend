import { useState } from "react";

export function useLogEmail() {
  const [email, setEmail] = useState("");
  
  const changeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
   
  return {
    email,
    setEmail,
    changeEmail,
  };
}
