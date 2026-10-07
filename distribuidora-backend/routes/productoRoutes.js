import { Router } from 'express';
import { getProductos, getProducto, createProducto } from '../controllers/productoController.js';
//define las rutas para los productos y las asocia con los controladores correspondientes

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/', createProducto);

export default router;