import { Travel } from '../model/travel.js';


class CoordenadasService {
  static async procesarCoordenadas(coordenadas, io) {
    try {
      // Guardar coordenadas en la base de datos
      const nuevaCoordenada = await Travel.create({
        coordenate: coordenadas,
      });
      console.log('Coordenadas guardadas en la base de datos:', nuevaCoordenada);

      // Emitir coordenadas al chofer
      io.emit('coordenadasChofer', coordenadas);
    } catch (error) {
      console.error('Error al procesar las coordenadas:', error.message);
      throw new Error('Error al procesar las coordenadas');
    }
  }
}
  
  export default CoordenadasService;