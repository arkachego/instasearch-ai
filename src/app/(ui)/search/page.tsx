'use client';

// Libraries
import { useEffect, useState } from "react";

// Sections
import HeaderSection from "@/components/sections/HeaderSection";
import FilterSection from "@/components/sections/FilterSection";
import ContentSection from "@/components/sections/ContentSection";

// Hooks
import { useQuery } from "@/hooks/useQuery";

// Services
import { fetchFilters, fetchProducts } from "@/services/SearchService";

// Types
import { FilterType } from "@/types/FilterType";

const SearchPage: React.FC = () => {

  const [ launched, setLaunched ] = useState<boolean>(false);
  const { keyword, category, filters, setFilters, setProducts } = useQuery();

  useEffect(() => {
    if (category) {
      updateFilters();
    }
  }, [ category ]);

  useEffect(() => {
    if (!launched && filters.length) {
      updateProducts();
      setLaunched(true);
    }
  }, [ launched, filters ])
  
  const updateFilters = async () => {
    try {
      const allFilters: FilterType[] = await fetchFilters(category);
      setFilters(allFilters);
    }
    catch (error) {
      console.error(error);
    }
  };

  const updateProducts = async () => {
    try {
      const allProducts: any[] = await fetchProducts(keyword, category, filters);
      setProducts(allProducts);
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-700">
      <HeaderSection
        onSubmit={updateProducts}
      />
      <div className="flex w-full h-[calc(100vh-69px)]">
        <FilterSection
          onSubmit={updateProducts}
        />
        <ContentSection/>
      </div>
    </div>
  );

};

export default SearchPage;
