import express from 'express';
const router = express.Router();
import {
  getAllClients,
  getIndividualClient,
  createClient,
  updateClient,
  deleteClient,
} from '../../controllers/crud/clientCrud.js';
import { authorize, protect } from '../../utils/auth.js';

router
  .get('/',  getAllClients)
  .get('/:id',  getIndividualClient)
  .post('/', protect, authorize('user', 'admin'), createClient)
  .put('/:id', protect, updateClient)
  .delete('/:id', protect, deleteClient);

export default router;
