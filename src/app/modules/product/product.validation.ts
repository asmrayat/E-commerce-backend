import { z } from 'zod';

// Nested Schemas (Mirroring Mongoose Subdocuments)
const VariantsValidationSchema = z.object({
  type: z.string().min(1, 'Variant type is required'),
  value: z.string().min(1, 'Variant value is required'),
});

const InventoryValidationSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be a positive integer'),
  inStock: z.boolean(),
});

// Main Product Schema
const ProductValidationSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product description is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  category: z.string().min(1, 'Product category is required'),
  tags: z.array(z.string().min(1)).min(1, 'At least one tag is required'),
  variants: z
    .array(VariantsValidationSchema)
    .min(1, 'At least one variant is required'),
  inventory: InventoryValidationSchema,
  isDeleted: z.boolean().optional().default(false), // Optional in Zod since it has a default in Mongoose
});

export default ProductValidationSchema;
