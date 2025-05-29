// Libraries
import { useEffect, useState } from "react";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Props
import { CategoryProps } from "@/props/CategoryProps";

// Types
import { CategoryType } from "@/types/CategoryType";

const CategoryInput: React.FC<CategoryProps> = ({ category, setCategory }) => {

  const [ categories, setCategories ] = useState<CategoryType[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/category');
      const allCategories: CategoryType[] = await response.json();
      setCategories(allCategories);
      if (!category) {
        setCategory(allCategories[0].slug);
      }
    }
    catch (error) {
      console.error(error);
      setCategories([]);
      setCategory('');
    }
  };

  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger className="w-[150px] bg-neutral-300 dark:bg-neutral-600">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((c: CategoryType) => (
          <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

};

export default CategoryInput;
