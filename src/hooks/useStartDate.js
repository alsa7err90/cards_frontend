import { useState } from "react";

export function useStartDate() {
  const [startDate, setStartDate] = useState("");

  const changeStartDate = (event) => {
    const startDate = event.target.value;
    setStartDate(startDate);
  };

  return {
    startDate,
    changeStartDate,
  };
}
