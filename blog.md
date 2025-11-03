# Building a Task Reminder AI Agent for Telex.im

## Introduction
In this post, I’ll walk through how I built a Task Reminder AI Agent using Node.js and Express, integrated with Telex.im via the A2A protocol.

## Why This Agent?
The agent helps users manage tasks by allowing them to add tasks and list them easily in Telex channels.

## Tech Stack
- Node.js
- Express
- UUID
- dotenv

## How A2A Protocol Works
The A2A protocol uses JSON-RPC 2.0 for communication between agents and Telex.im. My agent supports `message/send` and `execute` methods.

## Implementation Steps
1. Set up Node.js and Express
2. Created A2A models for messages and tasks
3. Built `/a2a/task` endpoint to process messages
4. Added health check endpoint
5. Tested locally with Postman

## Testing
I tested using JSON-RPC requests like:
```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "message": {
      "kind": "message",
      "role": "user",
      "parts": [
        { "kind": "text", "text": "add task Submit report by 5pm" }
      ]
    }
  }
}

## Deployment
The agent was deployed on Railway and connected to Telex.im using a workflow JSON.

## Challenges
- Understanding A2A protocol structure
- Ensuring proper JSON-RPC response format

## Links
- https://github.com/Adewallee/task-reminder-agent
- https://task-reminder-agent-production.up.railway.app/a2a/task

---

Thanks for reading! 🚀