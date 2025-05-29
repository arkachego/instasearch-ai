export type FilterType = {
  name: string;
  type: string;
  label: String;
  value: string[] | number[];
  values?: string[];
  minimum?: number;
  maximum?: number;
};
