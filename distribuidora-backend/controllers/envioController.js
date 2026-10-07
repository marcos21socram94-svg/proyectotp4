import * as envioModel from '../models/envioModel.js';


///Gestiona el flujo de peticiones/respuestas HTTP y transfiere errores al errorHandler

// GET /api/envios
export const getCompaniasEnvio = async (req, res, next) => {
  try {
    const companias = await envioModel.getAllCompaniasEnvio();
    res.json(companias);
  } catch (error) {
    next(error);
  }
};

// GET /api/envios/:id
export const getCompaniaEnvio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const compania = await envioModel.getCompaniaEnvioById(id);

    if (!compania) {
      return res.status(404).json({ mensaje: 'Compañía de envío no encontrada' });
    }

    res.json(compania);
  } catch (error) {
    next(error);
  }
};

// POST /api/envios
export const createCompaniaEnvio = async (req, res, next) => {
  try {
    const nuevaCompania = await envioModel.createCompaniaEnvio(req.body);
    res.status(201).json(nuevaCompania);
  } catch (error) {
    next(error);
  }
};

// PUT /api/envios/:id
export const updateCompaniaEnvio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await envioModel.updateCompaniaEnvio(id, req.body);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Compañía de envío no encontrada para actualizar' });
    }

    res.json({ mensaje: 'Compañía de envío actualizada correctamente', id_compania_envio: id, ...req.body });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/envios/:id
export const deleteCompaniaEnvio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await envioModel.deleteCompaniaEnvio(id);

    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Compañía de envío no encontrada para eliminar' });
    }

    res.json({ mensaje: 'Compañía de envío eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};