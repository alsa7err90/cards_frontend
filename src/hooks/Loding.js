import { useState } from "react";

export function useLoding() {
  const [loading, setLoading] = useState(false);
  return {
    loading,
    setLoading,
  };
}
