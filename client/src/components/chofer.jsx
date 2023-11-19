import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const ChoferView = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [directions, setDirections] = useState(null);

  const handleObtenerCoordenadas = async () => {
    try {
      // Realiza una solicitud al servidor para obtener las coordenadas
      const response = await fetch('http://localhost:7000/api/map');
      const data = await response.json();
      setCoordinates(data);
    } catch (error) {
      console.error('Error al obtener coordenadas:', error.message);
    }
  };

  useEffect(() => {
    // Llamada a la función para obtener las coordenadas cuando el componente se monta
    handleObtenerCoordenadas();
  }, []);

  return (
    <div>
      <h1>Vista del Chofer</h1>

      <button onClick={handleObtenerCoordenadas}>Obtener Coordenadas</button>

      {coordinates.length > 0 && (
        <LoadScript googleMapsApiKey="AIzaSyAdfrKnsern-zn80h22lDBl00D2z51J_h8">
          <GoogleMap
            center={{ lat: coordinates[0].origin.lat, lng: coordinates[0].origin.lng }}
            zoom={8}
          >
            {coordinates.map((coord, index) => (
              <div key={index}>
                <Marker position={{ lat: coord.origin.lat, lng: coord.origin.lng }} />
                <Marker position={{ lat: coord.destination.lat, lng: coord.destination.lng }} />
                <DirectionsService
                  options={{
                    destination: coord.destination,
                    origin: coord.origin,
                    travelMode: 'DRIVING',
                  }}
                  callback={(result) => {
                    if (result !== null) {
                      setDirections(result);
                    }
                  }}
                />
                {directions && <DirectionsRenderer directions={directions} />}
              </div>
            ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default ChoferView;
