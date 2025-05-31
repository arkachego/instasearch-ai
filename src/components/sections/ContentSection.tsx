'use client';

// Libraries
import { IconChevronLeft, IconChevronRight, IconCurrencyRupee, IconMapPin } from "@tabler/icons-react";

// Components
import { Grid, GridItem } from "@/components/ui/grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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
import { ProductType } from "@/types/ProductType";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type Props = {
  onPage: (newPage: number) => void;
  onItem: (newPage: number) => void;
};

const ContentSection: React.FC<Props> = ({ onPage, onItem }) => {

  const { products, count, page, item } = useQuery();
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
    <div className="flex-1">
      <ScrollArea className="h-[calc(100vh-138px)]">
        <Grid className="m-4 max-w-6xl mx-auto px-4">
          {products.map((product: ProductType) => (
            <GridItem
              key={product._id}
              header={(
                <img
                  className="w-full h-[182px] object-cover"
                  src={product.thumbnail}
                />
              )}
              icon={(
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <IconMapPin/>
                    <span className="pt-[1px] text-sm">{product.location}</span>
                  </div>
                  <div className="flex gap-1">
                    <IconCurrencyRupee/>
                    <span className="pt-[1px] text-sm">{product.price}</span>
                  </div>
                </div>
              )}
              title={<span className="text-sm">{product.title}</span>}
              description={(
                <div>
                  <div className="mb-4">{product.description}</div>
                  <div className="flex gap-2">
                    {product.attributes.map((attribute) => {
                      return (
                        <Badge variant="secondary" key={attribute.value}>{attribute.value}</Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            />
          ))}
        </Grid>
      </ScrollArea>
      <div className="p-4 flex justify-between items-center border-t border-t-neutral-300 dark:border-t-neutral-500">
        <div>
          <Select value={stringItem} onValueChange={(newValue: string) => onItem(parseInt(newValue))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {[ 20,  50, 100 ].map((items: number) => (
                <SelectItem value={items.toString()}>{items} / page</SelectItem>
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
    </div>
  );

};

export default ContentSection;
