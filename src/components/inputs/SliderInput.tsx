import { FilterProps } from "@/props/FilterProps";
import { DualRangeSlider, Slider } from "@/components/ui/slider";

const SliderInput: React.FC<FilterProps> = ({ filter, setFilter }) => {

  const onChange = (value: number[]) => {
    setFilter({ ...filter, value: value });
  };

  return (
    <div>
      <div className="text-lg font-bold mb-3">{filter.label}</div>
      <div className="mb-6 px-4">
        <DualRangeSlider
          label={(value) => <span>{value}</span>}
          labelPosition="bottom"
          value={filter.value as unknown as number[]}
          onValueChange={onChange}
          min={filter.minimum}
          max={filter.maximum}
          step={1000}
        />
      </div>
    </div>
  );

};

export default SliderInput;
