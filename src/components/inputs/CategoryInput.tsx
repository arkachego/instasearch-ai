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

// Services
import { fetchCategories } from "@/services/SearchService";

const CategoryInput: React.FC<CategoryProps> = ({ category, setCategory }) => {

  const [ categories, setCategories ] = useState<CategoryType[]>([]);

  useEffect(() => {
    updateCategories();
  }, []);

  const updateCategories = async () => {
    try {
      const allCategories: CategoryType[] = await fetchCategories();
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
    <div>
      <div className="text-lg font-bold mb-3">Category</div>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full bg-neutral-300 dark:bg-neutral-600">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c: CategoryType) => (
            <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

};

export default CategoryInput;
