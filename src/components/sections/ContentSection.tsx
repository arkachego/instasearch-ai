'use client';

// Libraries
import { useEffect, useState } from "react";
import { IconCurrencyRupee, IconMapPin } from "@tabler/icons-react";

// Components
import { Grid, GridItem } from "@/components/ui/grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Hooks
import { useQuery } from "@/hooks/useQuery";

// Types
import { ProductType } from "@/types/ProductType";

const ContentSection: React.FC = () => {

  const { products } = useQuery();

  return (
    <ScrollArea className="h-[calc(100vh-69px)] flex-1">
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
  );

};

export default ContentSection;
