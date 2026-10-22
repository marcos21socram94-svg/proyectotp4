import { Router } from 'express';
import { informeVentas } from '../controllers/informeController';

const router = Router();

router.get('/ventas', informeVentas);

export default router;
