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
  count: number;
  setCount: (count: number) => void;
  page: number;
  setPage: (page: number) => void;
  item: number;
  setItem: (item: number) => void;
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
  count: 0,
  setCount: () => {},
  page: 1,
  setPage: () => {},
  item: 20,
  setItem: () => {},
  products: [],
  setProducts: () => {},
});

export const QueryProvider: React.FC<LayoutProps> = ({ children }) => {

  const [ keyword, setKeyword ] = useState<string>('');
  const [ category, setCategory ] = useState<string>('');
  const [ filters, setFilters ] = useState<FilterType[]>([]);
  const [ count, setCount ] = useState<number>(0);
  const [ page, setPage ] = useState<number>(1);
  const [ item, setItem ] = useState<number>(20);
  const [ products, setProducts ] = useState<ProductType[]>([]);

  const resetState = () => {
    setKeyword('');
    setCategory('');
    setFilters([]);
    setCount(0);
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
    count,
    setCount,
    page,
    setPage,
    item,
    setItem,
    products,
    setProducts,
  };

  return (
    <QueryStore.Provider value={value}>
      {children}
    </QueryStore.Provider>
  );

};
