import { useGlobals } from "@/hooks/useGlobals";
import { useQuery } from "@/hooks/useQuery";
import { FilterType } from "@/types/FilterType";
import { useEffect } from "react";
import SliderInput from "../inputs/SliderInput";
import CheckInput from "../inputs/CheckInput";

const FilterSection: React.FC = () => {

  const { filter } = useGlobals();
  const { category, filters, setFilters } = useQuery();

  useEffect(() => {
    if (category) {
      fetchFilters();
    }
  }, [ category ]);
  
  const fetchFilters = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/filter?category=${category}`);
      const allFilters: FilterType[] = await response.json();
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

  return filter ? (
    <div
      className="flex flex-col gap-6 p-8 w-[300px] border-r border-r-neutral-300 dark:border-r-neutral-500"
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
  ) : null;

};

export default FilterSection;
