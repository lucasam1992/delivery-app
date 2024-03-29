const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const http = require('http');

const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
});

const login = require('./routes/login');
const user = require('./routes/user');
const product = require('./routes/product');
const sale = require('./routes/sale');
const errorMiddleware = require('./middlewares/error');

app.use(cors());
app.use(bodyParser.json());

app.use('/images', express.static(path
  .join(__dirname, '..', '..', '/public', '/images', '/public')));

io.on('connection', (socket) => {
  socket.on('clientOrderSatus', (data) => {
    io.emit('serverNewStatus', data);
  });
});

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', login);
app.use('/users', user);
app.use('/products', product);
app.use('/sales', sale);

app.use(errorMiddleware);

module.exports = server;