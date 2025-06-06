import { AttributeType } from "./AttributeType";

export type ProductType = {
  _id: string;
  title: string;
  description: string;
  location: string;
  thumbnail: string;
  price: number;
  attributes: AttributeType[];
};
