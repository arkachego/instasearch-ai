// Components
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryInput from "@/components/inputs/CategoryInput";
import SliderInput from "@/components/inputs/SliderInput";
import CheckInput from "@/components/inputs/CheckInput";

// Hooks
import { useGlobals } from "@/hooks/useGlobals";
import { useQuery } from "@/hooks/useQuery";

// Types
import { FilterType } from "@/types/FilterType";

const FilterSection: React.FC = () => {

  const { filter } = useGlobals();
  const { category, setCategory, filters, setFilters } = useQuery();

  const updateFilter = (newFilter: FilterType) => {
    const newFilters = [ ...filters ];
    const filterIndex = newFilters.findIndex((f: FilterType) => f.name === newFilter.name);
    newFilters[filterIndex] = { ...newFilter };
    setFilters(newFilters);
  };

  return filter ? (
    <ScrollArea className="w-[300px] shrink-0 h-[calc(100vh-69px)] border-r border-r-neutral-300 dark:border-r-neutral-500">
      <div
        className="flex flex-col gap-6 px-8 pt-4 pb-8"
      >
        <CategoryInput
          category={category}
          setCategory={setCategory}
        />
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
    </ScrollArea>
  ) : null;

};

export default FilterSection;
