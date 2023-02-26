import { useState } from "react";

export function useImage() {
  const [image, setImage] = useState(null);

  function changeImage(event) {
    setImage(event.target.files[0]);
  }
  return {
    image,
    changeImage,
  };
}
