const express = require('express');
const http = require('http');
const webSocket = require('ws');

const PORT = process.env.PORT || 8001;
const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });

app.get('/api/ping', (__request, response) => {
    response.json({ pong: true });
});

app.get('/health', (__req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado');
    ws.send('Bem-vindo ao servidor WebSocket!');

    ws.on('message', (message) => {
        console.log('Mensagem recebida do cliente: ', message);
        ws.send(`Echo: ${message}`);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

