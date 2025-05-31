'use client';

// Libraries
import { IconChevronLeft, IconChevronRight, IconCurrencyRupee, IconMapPin } from "@tabler/icons-react";

// Components
import { Grid, GridItem } from "@/components/ui/grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Hooks
import { useQuery } from "@/hooks/useQuery";

// Types
import { ProductType } from "@/types/ProductType";
import { Button } from "../ui/button";

type Props = {
  onPage: (newPage: number) => void;
  onItem: (newPage: number) => void;
};

const ContentSection: React.FC<Props> = ({ onPage, onItem }) => {

  const { products, count, page, item } = useQuery();

  return (
    <div className="flex-1">
      <ScrollArea className="h-[calc(100vh-138px)]">
        <Grid className="m-4 max-w-6xl mx-auto">
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
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <IconMapPin/>
                    {product.location}
                  </div>
                  <div className="flex gap-1">
                    <IconCurrencyRupee/>
                    {product.price}
                  </div>
                </div>
              )}
              title={product.title}
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
      <div className="p-4 flex justify-between border-t border-t-neutral-300 dark:border-t-neutral-500">
        {page === 1 ? <div/> : (
          <Button onClick={() => onPage(page - 1)}>
            <IconChevronLeft/>
            Last
          </Button>
        )}
        {page * item > count ? <div/> : (
          <Button onClick={() => onPage(page + 1)}>
            Next
            <IconChevronRight/>
          </Button>
        )}
      </div>
    </div>
  );

};

export default ContentSection;
