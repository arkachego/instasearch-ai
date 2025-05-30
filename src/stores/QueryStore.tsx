// Libraries
import { createContext, useState } from "react";

// Props
import { LayoutProps } from "@/props/LayoutProps";

// Types
import { FilterType } from "@/types/FilterType";
import { ProductType } from "@/types/ProductType";

type QueryStoreType = {
  resetState: () => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
  category: string;
  setCategory: (category: string) => void;
  filters: FilterType[];
  setFilters: (filters: FilterType[]) => void;
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
};

export const QueryStore = createContext<QueryStoreType>({
  resetState: () => {},
  keyword: '',
  setKeyword: () => {},
  category: '',
  setCategory: () => {},
  filters: [],
  setFilters: () => {},
  products: [],
  setProducts: () => {},
});

export const QueryProvider: React.FC<LayoutProps> = ({ children }) => {

  const [ keyword, setKeyword ] = useState<string>('');
  const [ category, setCategory ] = useState<string>('');
  const [ filters, setFilters ] = useState<FilterType[]>([]);
  const [ products, setProducts ] = useState<ProductType[]>([]);

  const resetState = () => {
    setKeyword('');
    setCategory('');
    setFilters([]);
    setProducts([]);
  };

  const value: QueryStoreType = {
    resetState,
    keyword,
    setKeyword,
    category,
    setCategory,
    filters,
    setFilters,
    products,
    setProducts,
  };

  return (
    <QueryStore.Provider value={value}>
      {children}
    </QueryStore.Provider>
  );

};
