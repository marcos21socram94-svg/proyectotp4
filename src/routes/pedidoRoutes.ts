import { Router } from 'express';
import { listar, obtener, crear, actualizar, eliminar, estadisticas } from '../controllers/pedidoController';

import { validarId } from '../validations/validador';
import { validarCrearPedido, validarActualizarPedido } from '../validations/pedidoValidation';

// RUTAS de Pedidos: solo conectan cada URL + método HTTP con su función del controlador.
// Cada ruta pasa primero por la CAPA DE VALIDACIÓN (middlewares validar...) y recién después llega al controlador.
const router = Router();

router.get('/', listar);
router.get('/estadisticas', estadisticas); // va antes de '/:id' para que no se confunda con un id
router.get('/:id', validarId, obtener);
router.post('/', validarCrearPedido, crear);
router.put('/:id', validarId, validarActualizarPedido, actualizar);
router.delete('/:id', validarId, eliminar);

export default router;
