import { FilterType } from "@/types/FilterType";

export type FilterProps = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};
