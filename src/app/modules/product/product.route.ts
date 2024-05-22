import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

//this will call controller func
router.post('/products', ProductControllers.createProduct);
router.get('/products', ProductControllers.getALlProduct);
router.get('/products/:id', ProductControllers.getSingleProduct);
router.delete('/products/:id', ProductControllers.deleteSingleData);
router.put('/products/:id', ProductControllers.updateSingleData);

export const ProductRoutes = router;
