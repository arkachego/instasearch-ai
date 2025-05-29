import { FilterProps } from "@/props/FilterProps";
import { Checkbox } from "@/components/ui/checkbox";

const CheckInput: React.FC<FilterProps> = ({ filter, setFilter }) => {

  const onChange = (value: string, checked: boolean) => {
    const newValues = [ ...filter.value ];
    if (checked) {
      newValues.push(value);
    }
    else {
      const valueIndex = newValues.findIndex(v => v === value);
      newValues.splice(valueIndex, 1);
    }
    setFilter({ ...filter, value: newValues as string[] });
  };

  return (
    <div>
      <div className="text-lg font-bold mb-2">{filter.label}</div>
      <div className="flex flex-col gap-2">
        {filter.values?.map((value: string) => (
          <div key={value} className="flex items-center space-x-2">
            <Checkbox checked={(filter.value as string[]).includes(value)} onCheckedChange={(checked: boolean) => onChange(value, checked)}/>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

};

export default CheckInput;
