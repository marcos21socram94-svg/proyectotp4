import { Router } from 'express';
import {
  getCompaniasEnvio,
  getCompaniaEnvio,
  createCompaniaEnvio,
  updateCompaniaEnvio,
  deleteCompaniaEnvio
} from '../controllers/envioController.js';

const router = Router();

router.get('/', getCompaniasEnvio);
router.get('/:id', getCompaniaEnvio);
router.post('/', createCompaniaEnvio);
router.put('/:id', updateCompaniaEnvio);
router.delete('/:id', deleteCompaniaEnvio);

export default router;