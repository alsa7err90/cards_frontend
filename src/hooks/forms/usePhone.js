import { useState } from "react";

export function usePhone() {
  const [phone, setPhone] = useState("");

  const changePhone = (event) => {
    const phone = event.target.value;
    setPhone(phone); 
  };

  return {
    phone,
    setPhone,
    changePhone,
  };
}
