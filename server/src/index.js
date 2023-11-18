import express from 'express';
import cors from 'cors';
import { environment } from './config/environment.js';
import { connectDB } from './config/db.js';
import router from './routes/map.routes.js';
import 'dotenv/config';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer);


app.use(cors());
app.use(express.json());
// Pasa el objeto io a las rutas
app.use((req, res, next) => {
    req.io = io;
    next();
  });

app.use('/api', router);

// Manejo de conexiones Socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);
  
    // Manejar la recepción de coordenadas desde el cliente
    socket.on('coordenadasCliente', (coordenadas) => {
      // Procesar las coordenadas y enviarlas al chofer
      io.emit('coordenadasChofer', coordenadas);
    });
  
    // Manejar la desconexión del usuario
    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
    });
  });

app.listen(environment.PORT, () => {
    console.log(`Server running on port ${environment.PORT}`)
    connectDB();
});