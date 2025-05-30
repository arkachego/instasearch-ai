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

  const { products, category } = useQuery();
  const [ imageUrls, setImageUrls ] = useState<string[]>([]);

  useEffect(() => {
    setImageUrls(category === "televisions" ? [
      "http://localhost:3000/televisions/image1.avif",
      "http://localhost:3000/televisions/image2.jpg",
      "http://localhost:3000/televisions/image3.webp",
      "http://localhost:3000/televisions/image4.jpg",
      "http://localhost:3000/televisions/image5.avif",
      "http://localhost:3000/televisions/image6.jpg",
      "http://localhost:3000/televisions/image7.webp",
      "http://localhost:3000/televisions/image8.webp",
      "http://localhost:3000/televisions/image9.jpg",
      "http://localhost:3000/televisions/image10.jpg",
    ] : [
      "http://localhost:3000/televisions/image1.avif",
      "http://localhost:3000/televisions/image2.jpg",
      "http://localhost:3000/televisions/image3.webp",
      "http://localhost:3000/televisions/image4.jpg",
      "http://localhost:3000/televisions/image5.avif",
      "http://localhost:3000/televisions/image6.jpg",
      "http://localhost:3000/televisions/image7.webp",
      "http://localhost:3000/televisions/image8.webp",
      "http://localhost:3000/televisions/image9.jpg",
      "http://localhost:3000/televisions/image10.jpg",
    ]);
  }, [ category ]);

  return (
    <ScrollArea className="p-4 h-[calc(100vh-69px)] flex-1">
      <Grid className="max-w-6xl mx-auto">
        {products.map((product: ProductType) => (
          <GridItem
            key={product._id}
            header={(
              <img
                className="w-full h-[182px] object-cover"
                src={imageUrls[Math.floor(Math.random() * imageUrls.length)]}
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
