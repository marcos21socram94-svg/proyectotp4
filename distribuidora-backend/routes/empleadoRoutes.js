import { Router } from 'express';
import {
  getEmpleados,
  getEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
} from '../controllers/empleadoController.js';

const router = Router();

router.get('/', getEmpleados);
router.get('/:id', getEmpleado);
router.post('/', createEmpleado);
router.put('/:id', updateEmpleado);
router.delete('/:id', deleteEmpleado);

export default router;