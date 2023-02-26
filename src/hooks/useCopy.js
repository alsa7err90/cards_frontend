import { useState } from "react";

export function useCopy() {
  const [copystate, setCopyState] = useState("copy");

  const copyNow = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setCopyState("Copied!");
  };
  return {
    copystate,
    copyNow,
  };
}
