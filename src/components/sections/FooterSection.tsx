'use client';

// Libraries
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Hooks
import { useQuery } from "@/hooks/useQuery";

// Types
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type Props = {
  onPage: (newPage: number) => void;
  onItem: (newPage: number) => void;
};

const FooterSection: React.FC<Props> = ({ onPage, onItem }) => {

  const { count, page, item } = useQuery();
  const [ boundary, setBoundary ] = useState<number[]>([ 0, 0 ]);
  const [ stringItem, setStringItem ] = useState<string>('');

  useEffect(() => {
    const isLastPage = count <= page * item;
    setBoundary([
      ((page - 1) * item) + 1,
      isLastPage ? count : page * item,
    ]);
  }, [ count, page, item ]);

  useEffect(() => {
    setStringItem(item.toString());
  }, [ item ]);

  return (
    <div className="p-4 flex justify-between items-center border-t border-t-neutral-300 dark:border-t-neutral-500">
      <div>
        <Select value={stringItem} onValueChange={(newValue: string) => onItem(parseInt(newValue))}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {[ 20,  50, 100 ].map((items: number) => (
              <SelectItem key={items} value={items.toString()}>{items} / page</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex">
        <span className="pr-1 hidden md:block">Showing</span>
        <span>{boundary[0]}-{boundary[1]}</span>
        <span className="px-1 hidden md:block">of</span>
        <span className="px-1 block md:hidden">/</span>
        <span>{count}</span>
        <span className="pl-1 hidden md:block">products</span>
      </div>
      <div className="flex gap-2 items-center">
        <Button disabled={page === 1} className="w-[36px] md:w-[82px]" onClick={() => onPage(page - 1)}>
          <IconChevronLeft/>
          <span className="px-1 hidden md:block">Last</span>
        </Button>
        <Button disabled={page * item >= count} className="w-[36px] md:w-[82px]" onClick={() => onPage(page + 1)}>
          <span className="px-1 hidden md:block">Next</span>
          <IconChevronRight/>
        </Button>
      </div>
    </div>
  );

};

export default FooterSection;
