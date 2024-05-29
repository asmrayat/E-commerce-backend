import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServer } from './order.server';
import { ProductServices } from '../product/product.service';

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;

  try {
    const result:any= await ProductServices.getSingleProductFromDB(
      orderData.productId,
    );
    const orderQuantity = orderData.quantity;
    const currentQuantity = result.inventory.quantity;

    if (currentQuantity === 0) {
      OrderServer.updateStock(orderData.productId);
      res.status(500).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    } else {
      if (currentQuantity >= orderQuantity) {
        const zodParseData = orderValidationSchema.parse(orderData);
        const result = await OrderServer.createOrderIntoDB(zodParseData);
        const finalQuantity = currentQuantity - orderQuantity;
        OrderServer.updateQuantity(orderData.productId, finalQuantity);

        res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: result,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order not found',
    });
  }
};
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await OrderServer.getAllOrderFromDB(email as string);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order not found',
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
