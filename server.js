// server.js
require('dotenv').config();
const express = require('express');
const { processMessages } = require('./agent/taskAgent');
const { A2AMessage } = require('./a2a/models');

const app = express();
app.use(express.json());

app.post('/a2a/task', async (req, res) => {
  try {
    const body = req.body;

    if (body.jsonrpc !== "2.0" || !body.id) {
      return res.status(400).json({
        jsonrpc: "2.0",
        id: body.id || null,
        error: {
          code: -32600,
          message: "Invalid Request"
        }
      });
    }

    const method = body.method;
    let messages = [];
    let contextId = null;
    let taskId = null;

    if (method === "message/send") {
      messages = [body.params.message];
    } else if (method === "execute") {
      messages = body.params.messages;
      contextId = body.params.contextId;
      taskId = body.params.taskId;
    } else {
      return res.status(400).json({
        jsonrpc: "2.0",
        id: body.id,
        error: {
          code: -32601,
          message: "Method not found"
        }
      });
    }

    const result = await processMessages(messages, contextId, taskId);

    res.json({
      jsonrpc: "2.0",
      id: body.id,
      result
    });

  } catch (err) {
    res.status(500).json({
      jsonrpc: "2.0",
      id: req.body?.id || null,
      error: {
        code: -32603,
        message: "Internal error",
        data: { details: err.message }
      }
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: "healthy", agent: "task-reminder" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});