import { Schema, model } from 'mongoose';
import { Inventory, Product, Variants } from './product.interface';

const VariantsSchema = new Schema<Variants>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});
const InventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantsSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

//pre save middleware

// productSchema.pre('find',function(next){
//  this.find({isDeleted:{$ne:true}})
//  next()
// })
// productSchema.pre('findOne',function(next){
//  this.find({isDeleted:{$ne:true}})
//  next()

// })

export const productModel = model<Product>('product', productSchema); //made schema
