import { io, Socket } from 'socket.io-client';
import { Task, Project } from '../types';

const SOCKET_URL = 'https://google.com';

let socket: Socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }
};

export const subscribeToUpdates = (callback: (data: any) => void) => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.');
  }

  socket.on('projectUpdate', (project: Project) => {
    callback({ type: 'PROJECT_UPDATE', data: project });
  });

  socket.on('taskUpdate', (task: Task) => {
    callback({ type: 'TASK_UPDATE', data: task });
  });
};

export const emitTaskUpdate = (task: Task) => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.');
  }

  socket.emit('taskUpdate', task);
};

export const emitProjectUpdate = (project: Project) => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.');
  }

  socket.emit('projectUpdate', project);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};