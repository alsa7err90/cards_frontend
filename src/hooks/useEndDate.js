import { useState } from "react";

export function useEndDate() {
  const [endDate, setEndDate] = useState("");

  const changeEndDate = (event) => {
    const endDate = event.target.value;
    setEndDate(endDate);
  };

  return {
    endDate,
    changeEndDate,
  };
}
