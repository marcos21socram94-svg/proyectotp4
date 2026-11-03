import { Router } from 'express';
import { listar, obtener, crear, actualizar, eliminar, estadisticas, ajustarPrecios } from '../controllers/productoController';

import { validarId } from '../validations/validador';
import { validarCrearProducto, validarActualizarProducto, validarAjustePrecios } from '../validations/productoValidation';

// RUTAS de Productos: solo conectan cada URL + método HTTP con su función del controlador.
// Cada ruta pasa primero por la CAPA DE VALIDACIÓN (middlewares validar...) y recién después llega al controlador.
const router = Router();

router.get('/', listar);
router.get('/estadisticas', estadisticas); // va antes de '/:id' para que no se confunda con un id
router.patch('/ajustar-precios', validarAjustePrecios, ajustarPrecios); // SQL puro ($executeRaw). Antes de '/:id'
router.get('/:id', validarId, obtener);
router.post('/', validarCrearProducto, crear);
router.put('/:id', validarId, validarActualizarProducto, actualizar);
router.delete('/:id', validarId, eliminar);

export default router;
