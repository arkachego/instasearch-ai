// Types
import { CategoryType } from "@/types/CategoryType";
import { FilterType } from "@/types/FilterType";
import { ProductType } from "@/types/ProductType";

// Server URL
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000/api';

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${baseURL}/categories`);
    const categories = await response.json();
    return categories as unknown as CategoryType[];
  }
  catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchFilters = async (category: string) => {
  try {
    const response = await fetch(`${baseURL}/filters?category=${category}`);
    const filters = await response.json();
    return filters as unknown as FilterType[];
  }
  catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCount = async (keyword: string, category: string, filters: FilterType[]) => {
  try {
    const attributes: any = {};
    filters.forEach((filter: FilterType) => {
      if (filter.value.length) {
        attributes[filter.name] = filter.value;
      }
    });
    const response = await fetch(`${baseURL}/count?q=${keyword}&category=${category}&filters=${JSON.stringify(attributes)}`);
    const result = await response.json();
    return result.count as unknown as number;
  }
  catch (error) {
    console.error(error);
    return [];
  }
};


export const fetchProducts = async (keyword: string, category: string, filters: FilterType[], page: number, item: number) => {
  try {
    const attributes: any = {};
    filters.forEach((filter: FilterType) => {
      if (filter.value.length) {
        attributes[filter.name] = filter.value;
      }
    });
    const response = await fetch(`${baseURL}/search?q=${keyword}&category=${category}&filters=${JSON.stringify(attributes)}&page=${page}&item=${item}`);
    const products = await response.json();
    return products as unknown as ProductType[];
  }
  catch (error) {
    console.error(error);
    return [];
  }
};
