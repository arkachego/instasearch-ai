// Libraries
import { createContext, useState } from "react";

// Props
import { LayoutProps } from "@/props/LayoutProps";

// Types
import { FilterType } from "@/types/FilterType";

type QueryStoreType = {
  resetState: () => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
  category: string;
  setCategory: (category: string) => void;
  filters: FilterType[];
  setFilters: (filters: FilterType[]) => void;
};

export const QueryStore = createContext<QueryStoreType>({
  resetState: () => {},
  keyword: '',
  setKeyword: () => {},
  category: '',
  setCategory: () => {},
  filters: [],
  setFilters: () => {},
});

export const QueryProvider: React.FC<LayoutProps> = ({ children }) => {

  const [ keyword, setKeyword ] = useState<string>('');
  const [ category, setCategory ] = useState<string>('');
  const [ filters, setFilters ] = useState<FilterType[]>([]);

  const resetState = () => {
    setKeyword('');
    setCategory('');
    setFilters([]);
  };

  return (
    <QueryStore.Provider value={{ resetState, keyword, setKeyword, category, setCategory, filters, setFilters }}>
      {children}
    </QueryStore.Provider>
  );

};
