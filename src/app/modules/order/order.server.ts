import { productModel } from '../product/product.model';
import { Order } from './order.interface';
import { orderModel } from './order.model';

const createOrderIntoDB = async (order: Order) => {
  const result = await orderModel.create(order);
  return result;
};

const getAllOrderFromDB = async (email: string) => {
  if (email) {
    const result = await orderModel.find({ email });
    return result;
  } else {
    const result = await orderModel.find();
    return result;
  }
};

const updateQuantity = async (_id: string, quantity: number) => {
  const result = await productModel.updateOne(
    { _id },
    { $set: { 'inventory.quantity': quantity } },
  );

  return result;
};
const updateStock = async (_id: string) => {
  const result = await productModel.updateOne(
    { _id },
    { $set: { 'inventory.inStock': false } },
  );
  return result;
};

export const OrderServer = {
  createOrderIntoDB,
  getAllOrderFromDB,
  updateQuantity,
  updateStock,
};
