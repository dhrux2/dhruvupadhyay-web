const http = require('http');
const express = require('C:/Users/dhruv/AppData/Local/npm-cache/_npx/e593c9e34d50cf88/node_modules/express');
const { Server } = require('C:/Users/dhruv/AppData/Local/npm-cache/_npx/e593c9e34d50cf88/node_modules/socket.io');
const cors = require('C:/Users/dhruv/AppData/Local/npm-cache/_npx/e593c9e34d50cf88/node_modules/cors');
const crypto = require('crypto');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve local preview & static assets
app.use('/preview', express.static('c:/Dev/dhruvu-web'));
app.get('/preview', (req, res) => {
  res.sendFile(path.resolve('c:/Dev/dhruvu-web/index.html'));
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const siteIdToSocketMap = new Map();
const pendingToolResponse = new Map();

io.on('connection', (socket) => {
  const { siteId } = socket.handshake.query;
  console.log(`[SOCKET CONNECTED] siteId: ${siteId}, id: ${socket.id}`);
  
  if (siteId) {
    if (!siteIdToSocketMap.has(siteId)) {
      siteIdToSocketMap.set(siteId, new Set());
    }
    siteIdToSocketMap.get(siteId).add(socket);
  }

  socket.emit('connection-confirmation', {
    siteId: siteId || 'default',
    message: 'Connected to Webflow MCP'
  });

  socket.on('tool-call-response', (data) => {
    const { requestId, data: responseData } = data;
    console.log(`[TOOL CALL RESPONSE] reqId: ${requestId}`);
    if (requestId && pendingToolResponse.has(requestId)) {
      const cb = pendingToolResponse.get(requestId);
      cb(responseData);
      pendingToolResponse.delete(requestId);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`[SOCKET DISCONNECTED] siteId: ${siteId}, reason: ${reason}`);
    if (siteId && siteIdToSocketMap.has(siteId)) {
      siteIdToSocketMap.get(siteId).delete(socket);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Webflow MCP is running');
});

app.get('/status', (req, res) => {
  const sites = Array.from(siteIdToSocketMap.entries()).map(([k, set]) => ({
    siteId: k,
    activeSockets: set.size
  }));
  res.json({ status: true, totalConnected: io.engine.clientsCount, sites });
});

app.post('/call-tool', async (req, res) => {
  const { toolName, args, siteId } = req.body;
  
  let sockets = null;
  if (siteId && siteIdToSocketMap.has(siteId)) {
    sockets = siteIdToSocketMap.get(siteId);
  }
  if ((!sockets || sockets.size === 0) && siteIdToSocketMap.size > 0) {
    sockets = siteIdToSocketMap.values().next().value;
  }

  if (!sockets || sockets.size === 0) {
    return res.status(503).json({
      status: false,
      error: 'No active Designer app connection to the site'
    });
  }

  const requestId = `${siteId || 'default'}-${crypto.randomUUID()}`;

  const promise = new Promise((resolve) => {
    const timer = setTimeout(() => {
      pendingToolResponse.delete(requestId);
      resolve({ status: false, error: `Tool call timed out for ${toolName}` });
    }, 20000);

    pendingToolResponse.set(requestId, (data) => {
      clearTimeout(timer);
      resolve(data);
    });

    for (const socket of sockets) {
      socket.emit('call-tool', {
        toolName,
        args,
        siteId: siteId || 'default',
        requestId
      });
    }
  });

  const result = await promise;
  res.json(result);
});

const PORT = 1338;
server.listen(PORT, () => {
  console.log(`Bridge server listening on http://localhost:${PORT}`);
});
