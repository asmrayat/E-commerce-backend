import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import ProductValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  const { product: productData } = req.body;
  try {
    //creating Zod validation
    const zodParseData = ProductValidationSchema.parse(productData);
    //will call service func to send this data
    const result = await ProductServices.createProductIntoDB(zodParseData);
    //send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};

const getALlProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    // if (!searchTerm ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Route not found',
    //   });
    // }
    const result = await ProductServices.getAllProductFromDB(
      searchTerm as string,
    );
    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ProductServices.getSingleProductFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};

const deleteSingleData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProductServices.deleteSingleProductFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};
const updateSingleData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { product: productData } = req.body;
    const result = await ProductServices.updateSingleProductInDB(
      id,
      productData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};
export const ProductControllers = {
  createProduct,
  getALlProduct,
  getSingleProduct,
  deleteSingleData,
  updateSingleData,
};
