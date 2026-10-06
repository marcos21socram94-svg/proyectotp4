import { Router } from 'express';
import { getProductos, getProducto, createProducto } from '../controllers/productoController.js';

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/', createProducto);

export default router;