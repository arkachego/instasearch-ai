// Libraries
import { Schema, Document, model, models } from 'mongoose';

interface Attribute {
  name: string;
  type: string;
}

export interface CategoryDocument extends Document {
  name: string;
  slug: string;
  attributeSchema: Attribute[];
}

const CategorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  attributeSchema: [
    {
      name: { type: String, required: true },
      label: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
});

const Category = models.Category || model<CategoryDocument>('Category', CategorySchema);

export default Category;
