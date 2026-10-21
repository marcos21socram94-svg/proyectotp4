import { Router } from 'express';
import { getInformeStock } from '../controllers/informeController.js';

const router = Router();

// Ruta para el informe basado en SQL puro
router.get('/stock-valorizado', getInformeStock);

export default router;