import { Router } from 'express';
import { listar, obtener, crear, actualizar, eliminar, estadisticas } from '../controllers/empleadoController';

import { validarId } from '../validations/validador';
import { validarCrearEmpleado, validarActualizarEmpleado } from '../validations/empleadoValidation';

// RUTAS de Empleados: solo conectan cada URL + método HTTP con su función del controlador.
// Cada ruta pasa primero por la CAPA DE VALIDACIÓN (middlewares validar...) y recién después llega al controlador.
const router = Router();

router.get('/', listar);
router.get('/estadisticas', estadisticas); // va antes de '/:id' para que no se confunda con un id
router.get('/:id', validarId, obtener);
router.post('/', validarCrearEmpleado, crear);
router.put('/:id', validarId, validarActualizarEmpleado, actualizar);
router.delete('/:id', validarId, eliminar);

export default router;
