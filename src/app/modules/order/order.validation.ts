import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().min(0),
  quantity: z.number().int().min(1),
});

export default orderValidationSchema;
