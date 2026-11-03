import { Router } from 'express';
import { listar, obtener, crear, actualizar, eliminar, estadisticas } from '../controllers/clienteController';

import { validarId } from '../validations/validador';
import { validarCrearCliente, validarActualizarCliente } from '../validations/clienteValidation';

// RUTAS de Clientes: solo conectan cada URL + método HTTP con su función del controlador.
// Cada ruta pasa primero por la CAPA DE VALIDACIÓN (middlewares validar...) y recién después llega al controlador.
const router = Router();

router.get('/', listar);
router.get('/estadisticas', estadisticas); // va antes de '/:id' para que no se confunda con un id
router.get('/:id', validarId, obtener);
router.post('/', validarCrearCliente, crear);
router.put('/:id', validarId, validarActualizarCliente, actualizar);
router.delete('/:id', validarId, eliminar);

export default router;
