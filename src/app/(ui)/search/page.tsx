'use client';

// Components
import { IconMoon, IconSun, IconFilterOff, IconFilter } from "@tabler/icons-react";
import { SearchInput } from "@/components/ui/search-input";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";

// Hooks
import { useGlobals } from "@/hooks/useGlobals";

const SearchPage: React.FC = () => {

  const { theme, toggleTheme, filter, toggleFilter } = useGlobals();

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-700">
      <div className="flex justify-between items-center gap-4 p-4">
        <Button size="icon" onClick={toggleFilter}>
          {filter ? <IconFilterOff/> : <IconFilter/>}
        </Button>
        <SearchInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <Button size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <IconSun/> : <IconMoon/>}
        </Button>
      </div>
      <Divider/>
      <div className="flex w-full h-[calc(100vh-82px)]">
        {filter && (
          <>
            <div className="p-4 w-[300px]">Filter content</div>
            <Divider orientation="vertical"/>
          </>
        )}
        <div className="p-4 flex-1">Search Results</div>
      </div>
    </div>
  );

};

export default SearchPage;
