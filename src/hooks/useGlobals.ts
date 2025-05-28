// Libraries
import { useContext } from "react";

// Contexts
import { GlobalStore } from "@/stores/GlobalStore";

export const useGlobals = () => {
  const context = useContext(GlobalStore);
  if (!context) {
    throw new Error("useGlobals must be used within a GlobalStore");
  }
  return context;
};
