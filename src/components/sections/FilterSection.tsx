// Components
import { Button } from "@/components/ui/button";
import SliderInput from "@/components/inputs/SliderInput";
import CheckInput from "@/components/inputs/CheckInput";

// Hooks
import { useGlobals } from "@/hooks/useGlobals";
import { useQuery } from "@/hooks/useQuery";

// Types
import { FilterType } from "@/types/FilterType";

type Props = {
  onFilter: () => void;
  onReset: () => void;
};

const FilterSection: React.FC<Props> = ({ onFilter, onReset }) => {

  const { filter } = useGlobals();
  const { filters, setFilters } = useQuery();

  const updateFilter = (newFilter: FilterType) => {
    const newFilters = [ ...filters ];
    const filterIndex = newFilters.findIndex((f: FilterType) => f.name === newFilter.name);
    newFilters[filterIndex] = { ...newFilter };
    setFilters(newFilters);
  };

  return filter ? (
    <div className="w-[227px] border-r border-r-neutral-300 dark:border-r-neutral-500">
      <div className="flex justify-between gap-4 px-4 pt-4">
        <Button variant="outline" className="flex-1" onClick={onReset}>
          Reset
        </Button>
        <Button className="flex-1" onClick={onFilter}>
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
