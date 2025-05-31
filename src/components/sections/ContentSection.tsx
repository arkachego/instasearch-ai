'use client';

// Libraries
import { IconCurrencyRupee, IconMapPin } from "@tabler/icons-react";

// Components
import { Skeleton } from "@/components/ui/skeleton";
import { Grid, GridItem } from "@/components/ui/grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Hooks
import { useQuery } from "@/hooks/useQuery";

// Types
import { ProductType } from "@/types/ProductType";

const ContentSection: React.FC = () => {

  const { loading, products } = useQuery();

  const getProducts = () => {
    return loading ? Array.from({ length: 20 }).map((_, index1: number) => {
      return {
        _id: `skeleton-${index1}`,
        title: '',
        description: '',
        location: '',
        thumbnail: '',
        price: 0,
        attributes: Array.from({ length: 4 }).map((_, index2: number) => {
          return {
            key: `key-${index2}`,
            value: `value-${index2}`
          }
        }),
      };
    }) : products;
  };

  return (
    <ScrollArea className="h-[calc(100vh-138px)]">
      <Grid className="m-4 max-w-6xl mx-auto px-4">
        {getProducts().map((product: ProductType) => (
          <GridItem
            key={product._id}
            header={loading ? (
              <Skeleton
                className="w-full h-[182px]"
              />
            ) : (
              <img
                className="w-full h-[182px] object-cover"
                src={product.thumbnail}
              />
            )}
            icon={(
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  {loading ? (
                    <Skeleton className="w-6 h-6"/>
                  ) : <IconMapPin/>}
                  {loading ? (
                    <Skeleton className="ml-1 w-[60px] h-4"/>
                  ) : <span className="pt-[1px] text-sm">{product.location}</span>}
                </div>
                <div className="flex items-center gap-1">
                  {loading ? (
                    <Skeleton className="w-6 h-6"/>
                  ) : <IconCurrencyRupee/>}
                  {loading ? (
                    <Skeleton className="ml-1 w-[60px] h-4"/>
                  ) : <span className="pt-[1px] text-sm">{product.price}</span>}
                </div>
              </div>
            )}
            title={loading ? (
              <Skeleton className="w-full h-[20px] my-2"/>
            ) : (
              <span className="text-sm">
                {product.title}
              </span>
            )}
            description={(
              <div>
                {loading ? (
                  <Skeleton className="w-full h-[14px] mt-2 mb-4"/>
                ) : <div className="mb-4">{product.description}</div>}
                
                <div className="flex gap-2">
                  {product.attributes.map((attribute) => {
                    return loading ? (
                      <Skeleton key={attribute.value} className="w-[50px] h-[22px]"/>
                    ) : (
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
  );

};

export default ContentSection;
