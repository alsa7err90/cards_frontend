import { useState } from "react";

export function useNote() {
  const [note, setNote] = useState("");
  const changeNote = (event) => {
    const note = event.target.value;
    setNote(note); 
  };

  return {
    note,
    changeNote,
  };
}
