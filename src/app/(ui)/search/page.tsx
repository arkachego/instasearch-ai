'use client';

// Sections
import HeaderSection from "@/components/sections/HeaderSection";
import FilterSection from "@/components/sections/FilterSection";
import ContentSection from "@/components/sections/ContentSection";

// Hooks
import { useQuery } from "@/hooks/useQuery";

// Services
import { fetchProducts } from "@/services/SearchService";

const SearchPage: React.FC = () => {

  const { keyword, category, filters, setProducts } = useQuery();

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
      <HeaderSection/>
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
