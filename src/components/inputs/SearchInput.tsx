'use client';

// Libraries
import { IconKeyboard } from "@tabler/icons-react";

// Components
import { Input } from "@/components/ui/input";

// Props
import { SearchProps } from "@/props/SearchProps";

type InputProps = SearchProps & {
  onSubmit: () => Promise<void>;
};

const SearchInput: React.FC<InputProps> = ({ keyword, setKeyword, onSubmit }) => {

  const onKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      await onSubmit();
    }
  };

  return (
    <div className="relative w-[239px] max-w-xs">
      <Input
        type="text"
        placeholder="Search Products..."
        className="w-full bg-neutral-300 dark:bg-neutral-600"
        value={keyword}
        onChange={(event: any) => setKeyword(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <IconKeyboard className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
    </div>
  );

};

export default SearchInput;
