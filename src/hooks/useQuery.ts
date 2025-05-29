// Libraries
import { useContext } from "react";

// Contexts
import { QueryStore } from "@/stores/QueryStore";

export const useQuery = () => {
  const context = useContext(QueryStore);
  if (!context) {
    throw new Error("useQuery must be used within a QueryStore");
  }
  return context;
};
