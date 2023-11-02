import { Injectable } from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { getChatRoomId } from 'src/utils';

@Injectable()
export class ChatService {
  sendMessage(payload: any, server: Server, roomId: string) {
    server.emit('message', payload);
  }

  createRoom(socket: Socket, server: Server) {
    let roomId = getChatRoomId();
    socket.join(roomId);
    server.to(socket.id).emit('groupCreated', { roomId });
  }

  joinRoom(socket: Socket, roomId: string, server: Server): WsResponse {
    socket.join(roomId);
    socket.to(roomId).emit('joined', { roomId });
    return { event: 'joined', data: roomId };
  }
}
