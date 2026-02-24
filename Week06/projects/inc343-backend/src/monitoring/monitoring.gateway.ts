import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, // Allow any client to connect
})
export class MonitoringGateway {
  @WebSocketServer()
  server: Server;

  // Manual method to broadcast data to all clients
  sendUpdate(payload: any) {
    this.server.emit('status-update', payload);
  }

  // Handle a test message from the client
  @SubscribeMessage('ping')
  handlePing(): string {
    return 'pong';
  }
}
