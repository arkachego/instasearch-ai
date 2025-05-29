import { Schema, Document, model, models, Types } from 'mongoose';

type AttributeDocument = {
  key: string;
  value: string | number;
};

export interface ListingDocument extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: Types.ObjectId;
  attributes: AttributeDocument[];
}

const AttributeSchema = new Schema<AttributeDocument>({
    key: { type: String, required: true },
    value: { type: Schema.Types.Mixed },
}, { _id: false });

const ListingSchema = new Schema<ListingDocument>({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  attributes: { type: [ AttributeSchema ], default: [] },
});

ListingSchema.index({
  title: 'text',
  description: 'text',
});
ListingSchema.index({
  'attributes.key': 1,
  'attributes.value': 1,
});

const Listing = models.Listing || model<ListingDocument>('Listing', ListingSchema);

export default Listing;
