import express from 'express';
const router = express.Router();
import { create, updateClient, max } from '../controllers/clientAgencyAPI.js';
import { protect, authorize} from '../utils/auth.js';

router
  .post('/create', protect, authorize('user', 'admin'), create)
  .put('/updateClient/:id', protect, authorize('user', 'admin'), updateClient)
  .get('/max', protect,authorize('user', 'admin'), max);

export default router;
