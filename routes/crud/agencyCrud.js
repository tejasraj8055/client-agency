import express from 'express';
const router = express.Router();
import {
  getAllAgencies,
  getIndividualAgency,
  createAgency,
  updateAgency,
  deleteAgency,
} from '../../controllers/crud/agencyCrud.js';
import { authorize, protect } from '../../utils/auth.js';

router
  .get('/', getAllAgencies)
  .get('/:id', getIndividualAgency)
  .post('/', protect, authorize('user', 'admin'), createAgency)
  .put('/:id', protect, updateAgency)
  .delete('/:id', protect, deleteAgency);

export default router;
