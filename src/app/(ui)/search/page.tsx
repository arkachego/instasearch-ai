'use client';

// Libraries
import { useEffect, useState } from "react";
import { IconRefresh, IconSun, IconMoon } from "@tabler/icons-react";

// Components
import { Button } from "@/components/ui/button";

// Sections
import HeaderSection from "@/components/sections/HeaderSection";
import FilterSection from "@/components/sections/FilterSection";
import ContentSection from "@/components/sections/ContentSection";
import FooterSection from "@/components/sections/FooterSection";
import FloatingButton from "@/components/buttons/FloatingButton";

// Hooks
import { useGlobals } from "@/hooks/useGlobals";
import { useQuery } from "@/hooks/useQuery";

// Services
import { fetchCount, fetchFilters, fetchProducts } from "@/services/SearchService";

// Types
import { FilterType } from "@/types/FilterType";
import { ProductType } from "@/types/ProductType";

const SearchPage: React.FC = () => {

  const { theme, toggleTheme } = useGlobals();
  const { setLoading } = useQuery();
  const [ opened, setOpened ] = useState<boolean>(false);

  const {
    category,
    keyword,
    setKeyword,
    filters,
    setFilters,
    setCount,
    page,
    setPage,
    item,
    setItem,
    setProducts,
  } = useQuery();

  useEffect(() => {
    if (category) {
      onCategoryChange();
    }
  }, [ category ]);

  const onCategoryChange = async () => {
    setLoading(true);
    setKeyword('');
    setFilters([]);
    setPage(1);

    const allFilters: FilterType[] = await fetchFilters(category);
    const totalCount = await fetchCount(keyword, category, allFilters);
    const allProducts: ProductType[] = await fetchProducts(keyword, category, allFilters, page, item);
    
    setFilters(allFilters);
    setCount(totalCount as number);
    setProducts(allProducts);
    setLoading(false);
  };

  const onFilterChange = async () => {
    setLoading(true);
    setPage(1);

    const totalCount = await fetchCount(keyword, category, filters);
    const allProducts: ProductType[] = await fetchProducts(keyword, category, filters, 1, item);

    setCount(totalCount as number);
    setProducts(allProducts);
    setLoading(false);
  };

  const onFilterReset = async () => {
    setLoading(true);
    const newFilters: FilterType[] = filters.map((item: FilterType) => {
      item.value = (item.type === "slider") ? [ item.minimum, item.maximum ] as number[] : [];
      return item;
    });
    setKeyword('');
    setFilters(newFilters);
    setPage(1);
    setOpened(false);

    const totalCount = await fetchCount(keyword, category, filters);
    const allProducts: ProductType[] = await fetchProducts('', category, newFilters, 1, item);

    setCount(totalCount as number);
    setProducts(allProducts);
    setLoading(false);
  };

  const onPageChange = async (newPage: number) => {
    setLoading(true);
    setPage(newPage);

    const allProducts: ProductType[] = await fetchProducts(keyword, category, filters, newPage, item);
    setProducts(allProducts);
    setLoading(false);
  };

  const onItemChange = async (newItem: number) => {
    setLoading(true);
    setPage(1);
    setItem(newItem);

    const allProducts: ProductType[] = await fetchProducts(keyword, category, filters, 1, newItem);
    setProducts(allProducts);
    setLoading(false);
  };

  const onThemeChange = () => {
    setOpened(false);
    toggleTheme();
  };

  return (
    <>
      <div className="w-full h-full bg-white dark:bg-neutral-700">
        <HeaderSection
          onFilter={onFilterChange}
          onReset={onFilterReset}
        />
        <div className="flex w-full h-[calc(100vh-69px)]">
          <FilterSection/>
          <div className="flex-1">
            <ContentSection/>
            <FooterSection
              onPage={onPageChange}
              onItem={onItemChange}
            />
          </div>
        </div>
      </div>
      <FloatingButton
        opened={opened}
        setOpened={setOpened}
      >
        <Button variant="secondary" className="flex items-center gap-2" onClick={onFilterReset}>
          <IconRefresh className="w-4 h-4" />
          <span>Reset Filter</span>
        </Button>
        <Button variant="secondary" className="flex items-center gap-2" onClick={onThemeChange}>
          {theme === "dark" ? <IconSun className="w-4 h-4"/> : <IconMoon className="w-4 h-4"/>}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </Button>
      </FloatingButton>
    </>
  );

};

export default SearchPage;
