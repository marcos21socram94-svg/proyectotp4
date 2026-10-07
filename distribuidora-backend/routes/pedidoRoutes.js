import { Router } from 'express';
import {
  getPedidos,
  getPedido,
  createPedido,
  updatePedido,
  deletePedido
} from '../controllers/pedidoController.js';

const router = Router();

router.get('/', getPedidos);
router.get('/:id', getPedido);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

export default router;