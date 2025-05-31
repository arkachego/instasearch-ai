// Libraries
import { useEffect } from "react";

// Components
import { Button } from "@/components/ui/button";
import SliderInput from "@/components/inputs/SliderInput";
import CheckInput from "@/components/inputs/CheckInput";

// Services
import { fetchFilters, fetchProducts } from "@/services/SearchService";

// Hooks
import { useGlobals } from "@/hooks/useGlobals";
import { useQuery } from "@/hooks/useQuery";

// Types
import { FilterType } from "@/types/FilterType";
import { ProductType } from "@/types/ProductType";

type Props = {
  onSubmit: () => void;
};

const FilterSection: React.FC<Props> = ({ onSubmit }) => {

  const { filter } = useGlobals();
  const { keyword, setKeyword, category, filters, setFilters, setProducts } = useQuery();

  const updateFilter = (newFilter: FilterType) => {
    const newFilters = [ ...filters ];
    const filterIndex = newFilters.findIndex((f: FilterType) => f.name === newFilter.name);
    newFilters[filterIndex] = { ...newFilter };
    setFilters(newFilters);
  };

  const resetFilters = async () => {
    setKeyword('');
    const newFilters: FilterType[] = filters.map((item: FilterType) => {
      item.value = (item.type === "slider") ? [ item.minimum, item.maximum ] as number[] : [];
      return item;
    });
    setFilters(newFilters);
    const allProducts: ProductType[] = await fetchProducts(keyword, category, newFilters);
    setProducts(allProducts);
  };

  return filter ? (
    <div className="w-[227px] border-r border-r-neutral-300 dark:border-r-neutral-500">
      <div className="flex justify-between px-4 pt-4">
        <Button onClick={resetFilters}>
          Reset
        </Button>
        <Button onClick={onSubmit}>
          Search
        </Button>
      </div>
      <div
        className="flex flex-col gap-6 px-8 pt-4 pb-8"
      >
        {filters.map((item: FilterType) => {
          if (item.type === "slider") {
            return (
              <SliderInput
                key={item.name}
                filter={item}
                setFilter={updateFilter}
              />
            );
          }
          else {
            return (
              <CheckInput
                key={item.name}
                filter={item}
                setFilter={updateFilter}
              />
            );
          }
        })}
      </div>
    </div>
  ) : null;

};

export default FilterSection;
