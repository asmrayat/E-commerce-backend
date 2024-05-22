import { Product } from './product.interface';
import { productModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await productModel.create(product);
  return result;
};
const getAllProductFromDB = async (searchTerm: string) => {
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    const result = await productModel.find({
      $or: [
        { name: { $regex: regex } },
        { category: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    });
    return result;
  } else {
    const result = await productModel.find();
    return result;
  }
};
const getSingleProductFromDB = async (_id: string) => {
  const result = await productModel.findOne({ _id });
  return result;
};
const deleteSingleProductFromDB = async (_id: string) => {
  const result = await productModel.deleteOne({ _id });
  return result;
};
const updateSingleProductInDB = async (
  _id: string,
  productData: Partial<Product>,
) => {
  const result = await productModel.findOneAndUpdate(
    { _id },
    { $set: productData },
    { new: true },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  updateSingleProductInDB,
};
