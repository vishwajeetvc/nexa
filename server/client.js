import net from 'node:net';
const socket = net.createConnection({ address: "192.168.102.224", port: 3000 });
socket.on('connect', () => {
  console.log("Connected to server Successfully");

  process.stdin.on('data', (data) => {
    socket.write(data);
  })

  socket.on('data', (chunk) => {
    console.log(chunk.toString());
  })

})





