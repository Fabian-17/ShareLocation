import CoordenadasService from "../services/travel.services.js";

class CoordenadasController {
    static async enviarCoordenadas(req, res) {
      try {
        const coordenadas = req.body;
        await CoordenadasService.procesarCoordenadas(coordenadas, req.io);
        res.status(200).json({ message: 'Coordenadas enviadas con éxito.' });
      } catch (error) {
        console.error('Error al procesar las coordenadas:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
      }
    }
  }
  
  export default CoordenadasController;