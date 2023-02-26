import { useState } from "react";

export function useSelectCard() {
  const [selectCard, setSelectCard] = useState();

  const changeSelectCard = (event) => {
    const val = event.target.value;
    setSelectCard(val);
  };

  return {
    selectCard,
    changeSelectCard,
    setSelectCard,
  };
}
