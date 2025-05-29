import { FilterProps } from "@/props/FilterProps";
import { DualRangeSlider, Slider } from "@/components/ui/slider";

const SliderInput: React.FC<FilterProps> = ({ filter, setFilter }) => {

  const onChange = (value: number[]) => {
    setFilter({ ...filter, value: value });
  };

  return (
    <div>
      <div className="text-lg font-bold mb-3">{filter.label}</div>
      <DualRangeSlider
        label={(value) => <span>{value}</span>}
        labelPosition="bottom"
        value={filter.value as unknown as number[]}
        onValueChange={onChange}
        min={filter.minimum}
        max={filter.maximum}
        step={1000}
        className="mb-6"
      />
    </div>
  );

};

export default SliderInput;
