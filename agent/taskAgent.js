// agent/taskAgent.js
const { A2AMessage, TaskStatus, Artifact, TaskResult, MessagePart } = require('../a2a/models');
const { v4: uuidv4 } = require('uuid');

const tasks = {}; // contextId => [tasks]

async function processMessages(messages, contextId = null, taskId = null) {
  contextId = contextId || uuidv4();
  taskId = taskId || uuidv4();

  const userMessage = messages[messages.length - 1];
  const text = userMessage.parts.find(p => p.kind === "text")?.text || "";

  if (!tasks[contextId]) tasks[contextId] = [];

  let responseText = "";

  if (text.toLowerCase().startsWith("add task")) {
    const task = text.slice(9).trim();
    tasks[contextId].push(task);
    responseText = `Task added: "${task}"`;
  } else if (text.toLowerCase().includes("list tasks")) {
    responseText = tasks[contextId].length
      ? `Your tasks:\n- ${tasks[contextId].join("\n- ")}`
      : "You have no tasks.";
  } else {
    responseText = `I didn't understand. Try "add task <your task>" or "list tasks".`;
  }

  const agentMessage = new A2AMessage("agent", [new MessagePart("text", responseText)], taskId);
  const status = new TaskStatus("completed", agentMessage);
  const artifacts = [new Artifact("response", [new MessagePart("text", responseText)])];

  return new TaskResult(contextId, status, artifacts, [userMessage, agentMessage]);
}

module.exports = { processMessages };