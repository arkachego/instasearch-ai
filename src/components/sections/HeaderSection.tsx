'use client';

// Libraries
import {
  IconMoon,
  IconSun,
  IconFilterOff,
  IconFilter,
  IconRefresh,
  IconSearch,
} from "@tabler/icons-react";

// Components
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/inputs/SearchInput";

// Hooks
import { useGlobals } from "@/hooks/useGlobals";
import { useQuery } from "@/hooks/useQuery";

type Props = {
  onFilter: () => Promise<void>;
  onReset: () => Promise<void>;
};

const HeaderSection: React.FC<Props> = ({ onFilter, onReset }) => {

  const {
    theme,
    toggleTheme,
    filter,
    toggleFilter,
  } = useGlobals();
  const {
    keyword,
    setKeyword,
    category,
    setCategory,
  } = useQuery();

  return (
    <div className="flex justify-between items-center gap-4 p-4 border-b border-b-neutral-300 dark:border-b-neutral-500">
      <div className="flex gap-4">
        <Button className="w-[36px]" size="icon" onClick={toggleFilter}>
          {filter ? <IconFilterOff/> : <IconFilter/>}
        </Button>
        <SearchInput
          keyword={keyword}
          setKeyword={setKeyword}
          onSubmit={onFilter}
        />
        <Button className="w-[36px] md:w-[100px]" onClick={onFilter}>
          <IconSearch/>
          <span className="px-1 hidden md:block">Search</span>
        </Button>
      </div>
      <div className="hidden md:flex gap-4">
        <Button variant="secondary" className="w-[36px]" onClick={onReset}>
          <IconRefresh/>
        </Button>
        <Button size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <IconSun/> : <IconMoon/>}
        </Button>
      </div>
    </div>
  );

};

export default HeaderSection;
