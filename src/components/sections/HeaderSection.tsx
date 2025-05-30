'use client';

// Libraries
import { IconMoon, IconSun, IconFilterOff, IconFilter } from "@tabler/icons-react";

// Components
import { Button } from "@/components/ui/button";
import CategoryInput from "@/components/inputs/CategoryInput";
import SearchInput from "@/components/inputs/SearchInput";

// Hooks
import { useGlobals } from "@/hooks/useGlobals";
import { useQuery } from "@/hooks/useQuery";

const HeaderSection: React.FC = () => {

  const { theme, toggleTheme, filter, toggleFilter } = useGlobals();
  const { keyword, setKeyword, category, setCategory } = useQuery();

  return (
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
  );

};

export default HeaderSection;
