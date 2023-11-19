import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import io from 'socket.io-client';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const UserView = () => {

  const [showModalOrigen, setShowModalOrigen] = useState(false);
  const [showModalDestino, setShowModalDestino] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:7000'); 

    // Escucha eventos del servidor para actualizar las coordenadas
    socket.on('coordenadasChofer', (coordenadas) => {
      // Aquí se realizan las acciones necesarias con las coordenadas recibidas
      console.log('Coordenadas del chofer:', coordenadas);
    });

    return () => {
      socket.disconnect(); // Desconectar el socket al desmontar el componente
    };
  }, []);

  // Crea una constante para el LoadScript de Google Maps API
  const googleMapsApiKey = "AIzaSyAdfrKnsern-zn80h22lDBl00D2z51J_h8"; // Reemplaza 'TU_API_KEY' con tu clave de API de Google Maps

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const handleShowModalOrigen = () => {
    setShowModalOrigen(true);
  };
  
  const handleCloseModalOrigen = () => {
    setShowModalOrigen(false);
  };
  
  const handleShowModalDestino = () => {
    setShowModalDestino(true);
  };
  
  const handleCloseModalDestino = () => {
    setShowModalDestino(false);
  };

  const handleSelectLocation = (location) => {
    if (!origin) {
      setOrigin(location);
      handleCloseModalOrigen();
    } else {
      if (!destination) {
        setDestination(location);
        handleCloseModalDestino();
      } else {
        setDestination(location);
        setDirections({
          origin: { lat: origin.lat, lng: origin.lng },
          destination: { lat: location.lat, lng: location.lng },
          travelMode: 'DRIVING',
        });
        handleCloseModalDestino();
      }
    }
  };

  const handleEnviarCoordenadas = () => {
    // Aquí se realiza la lógica para enviar las coordenadas al servidor
    const socket = io('http://localhost:7000');

    if (origin && destination) {
      // Envía las coordenadas al servidor
      socket.emit('coordenadasCliente', { origin, destination });
    } else {
      console.error('Por favor, selecciona tanto origen como destino antes de enviar las coordenadas.');
    }
  };

  return (
    <div>
      <Button className="primary" onClick={handleShowModalOrigen}>
        Seleccionar Origen
      </Button>
      <Button className="success" onClick={handleShowModalDestino}>
        Seleccionar Destino
      </Button>

      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        {/* Modal para seleccionar Origen */}
        <Modal show={showModalOrigen} onHide={handleCloseModalOrigen}>
          {/* Contenido del Modal */}
          <Modal.Header closeButton>
            <Modal.Title>Seleccionar Origen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}/>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
              center={{ lat: 0, lng: 0 }}
              zoom={2}
              onClick={(event) => handleSelectLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() })}
            >
              {origin && <Marker position={{ lat: origin.lat, lng: origin.lng }} />}
            </GoogleMap>
          </Modal.Body>
        </Modal>

        {/* Modal para seleccionar Destino */}
        <Modal show={showModalDestino} onHide={handleCloseModalDestino}>
          {/* Contenido del Modal */}
          <Modal.Header closeButton>
            <Modal.Title>Seleccionar Destino</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}/>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
              center={{ lat: 0, lng: 0 }}
              zoom={2}
              onClick={(event) => handleSelectLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() })}
            >
              {origin && <Marker position={{ lat: origin.lat, lng: origin.lng }} />}
            </GoogleMap>
          </Modal.Body>
        </Modal>
        
        {/* Código para mostrar direcciones */}
        {directions && (
          <div>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{ lat: (origin.lat + destination.lat) / 2, lng: (origin.lng + destination.lng) / 2 }}
              zoom={8}
            >
              <DirectionsService
                options={{
                  destination: directions.destination,
                  origin: directions.origin,
                  travelMode: directions.travelMode,
                }}
                callback={(result) => {
                  if (result !== null) {
                    setDirections(result);
                  }
                }}
              />
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>
        )}

        {/* Botón para enviar coordenadas */}
        {origin && destination && (
          <div>
            <Button variant="info" onClick={handleEnviarCoordenadas}>
              Enviar Coordenadas
            </Button>
          </div>
        )}
      </LoadScript>
    </div>
  );
};

export default UserView;
