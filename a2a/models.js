// a2a/models.js
const { v4: uuidv4 } = require('uuid');

class MessagePart {
  constructor(kind, text = null) {
    this.kind = kind;
    this.text = text;
  }
}

class A2AMessage {
  constructor(role, parts, taskId = null) {
    this.kind = "message";
    this.role = role;
    this.parts = parts;
    this.messageId = uuidv4();
    this.taskId = taskId;
  }
}

class TaskStatus {
  constructor(state, message = null) {
    this.state = state;
    this.timestamp = new Date().toISOString();
    this.message = message;
  }
}

class Artifact {
  constructor(name, parts) {
    this.artifactId = uuidv4();
    this.name = name;
    this.parts = parts;
  }
}

class TaskResult {
  constructor(contextId, status, artifacts, history) {
    this.id = uuidv4();
    this.contextId = contextId;
    this.status = status;
    this.artifacts = artifacts;
    this.history = history;
    this.kind = "task";
  }
}

module.exports = {
  MessagePart,
  A2AMessage,
  TaskStatus,
  Artifact,
  TaskResult
};