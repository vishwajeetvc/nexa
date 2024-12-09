import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',  // Allow all origins
  },
});

const clients = [];

io.on('connection', (socket) => {

  console.log(clients.length);
  clients.push(socket);

  socket.on('offer', (offer) => {
    socket.offer = offer;
    socket.emit('id', socket.id);
  })

  socket.on('give-me-offer', (id) => {
    // console.log(id);
    console.log("Asking for offer");
    const targetClient = clients.find(client => client.id.startsWith(id));
    console.log(targetClient)
    socket.emit('take-the-offer', targetClient.offer);
    console.log(targetClient.offer.type)

  })

  socket.on('answer', (answer, id) => {
    console.log("Got the answer from the client")
    const targetClient = clients.find(client => client.id.startsWith(id));
    targetClient.emit('take-the-answer', answer);
    console.log("Answer sent from the server")
    console.log(targetClient.id, answer.type)
  })

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
