import { useState } from "react";

export function useTitle() {
  const [title, setTitle] = useState("");

  const changeTitle = (event) => {
    const title = event.target.value;
    setTitle(title);
  };
  
  return {
    title,
    changeTitle,
  };
}
