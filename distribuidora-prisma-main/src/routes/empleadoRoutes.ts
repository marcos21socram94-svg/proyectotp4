import { Router } from 'express';
import { listar, obtener, crear, actualizar, eliminar, estadisticas } from '../controllers/empleadoController';

// RUTAS de Empleados: solo conectan cada URL + método HTTP con su función del controlador.
const router = Router();

router.get('/', listar);
router.get('/estadisticas', estadisticas); // va antes de '/:id' para que no se confunda con un id
router.get('/:id', obtener);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

export default router;
