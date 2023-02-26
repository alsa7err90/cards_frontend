import { useState } from "react";

export function useCity() {
  const [city, setCity] = useState("");
  const changeCity = (event) => {
    const city = event.target.value;
    setCity(city); 
  };

  return {
    city,
    changeCity,
  };
}
