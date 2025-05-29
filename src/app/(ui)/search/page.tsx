'use client';

// Components
import { IconMoon, IconSun, IconFilterOff, IconFilter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import CategoryInput from "@/components/inputs/CategoryInput";
import SearchInput from "@/components/inputs/SearchInput";
import FilterSection from "@/components/sections/FilterSection";

// Hooks
import { useGlobals } from "@/hooks/useGlobals";
import { useQuery } from "@/hooks/useQuery";

const SearchPage: React.FC = () => {

  const { theme, toggleTheme, filter, toggleFilter } = useGlobals();
  const { keyword, setKeyword, category, setCategory } = useQuery();

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-700">
      <div className="flex justify-between items-center gap-4 p-4 border-b border-b-neutral-300 dark:border-b-neutral-500">
        <div className="flex-1">
          <div className="flex gap-4">
            <Button size="icon" onClick={toggleFilter}>
              {filter ? <IconFilterOff/> : <IconFilter/>}
            </Button>
            <CategoryInput
              category={category}
              setCategory={setCategory}
            />
            <SearchInput
              keyword={keyword}
              setKeyword={setKeyword}
            />
          </div>
        </div>
        <Button size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <IconSun/> : <IconMoon/>}
        </Button>
      </div>
      <div className="flex w-full h-[calc(100vh-69px)]">
        <FilterSection/>
        <div className="p-8 flex-1">Search Results</div>
      </div>
    </div>
  );

};

export default SearchPage;
