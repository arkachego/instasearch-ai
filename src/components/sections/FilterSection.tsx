import { useGlobals } from "@/hooks/useGlobals";
import { useQuery } from "@/hooks/useQuery";
import { FilterType } from "@/types/FilterType";
import { useEffect, useState } from "react";
import SliderInput from "@/components/inputs/SliderInput";
import CheckInput from "@/components/inputs/CheckInput";
import { Button } from "@/components/ui/button";
import { fetchFilters, fetchProducts } from "@/services/SearchService";

type Props = {
  onSubmit: () => void;
};

const FilterSection: React.FC<Props> = ({ onSubmit }) => {

  const { filter } = useGlobals();
  const { keyword, category, filters, setFilters, setProducts } = useQuery();
  const [ launched, setLaunched ] = useState<boolean>(false);

  useEffect(() => {
    if (category) {
      updateFilters();
    }
  }, [ category ]);

  useEffect(() => {
    if (!launched && filters.length) {
      updateProducts();
      setLaunched(true);
    }
  }, [ filters, launched ]);
  
  const updateFilters = async () => {
    try {
      const allFilters: FilterType[] = await fetchFilters(category);
      setFilters(allFilters);
    }
    catch (error) {
      console.error(error);
    }
  };

  const updateFilter = (newFilter: FilterType) => {
    const newFilters = [ ...filters ];
    const filterIndex = newFilters.findIndex((f: FilterType) => f.name === newFilter.name);
    newFilters[filterIndex] = { ...newFilter };
    setFilters(newFilters);
  };

  const updateProducts = async () => {
    try {
      const allProducts: any[] = await fetchProducts(keyword, category, filters);
      setProducts(allProducts);
    }
    catch (error) {
      console.error(error);
    }
  };

  return filter ? (
    <div className="w-[300px] border-r border-r-neutral-300 dark:border-r-neutral-500">
      <div className="flex justify-between px-4 pt-4">
        <Button onClick={() => onSubmit()}>
          Reset
        </Button>
        <Button onClick={() => onSubmit()}>
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
