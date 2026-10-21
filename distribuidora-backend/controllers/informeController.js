import * as informeModel from '../models/informeModel.js';

// GET /api/informes/stock-valorizado
export const getInformeStock = async (req, res, next) => {
  try {
    const informe = await informeModel.getInformeStockValorizado();
    
    // Convertimos los tipos Decimal de SQL a Number/String si es necesario para que el JSON viaje limpio
    res.json({
      mensaje: "Informe de stock valorizado generado exitosamente mediante SQL puro ($queryRaw)",
      totalRegistros: informe.length,
      data: informe
    });
  } catch (error) {
    next(error);
  }
};