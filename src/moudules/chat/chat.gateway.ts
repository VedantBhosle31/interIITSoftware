import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Body, Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Message } from '../msg/message.type';
import { ChatService } from './chat.service';
import { RoomService } from '../room/room.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WsAuthGuard } from '../auth/ws-auth/ws-auth.guard';

@WebSocketGateway()
export class ChatGateway {
  socket: Socket;
  constructor(
    private chatService: ChatService,
    private roomServise: RoomService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.socket = socket;
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('createGroup')
  create(@MessageBody() body: any) {
    return this.roomServise.createRoom(this.socket, this.server);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('joinGroup')
  join(@MessageBody() roomId: string) {
    return this.roomServise.joinRoom(this.socket, roomId, this.server);
  }

  // @SubscribeMessage('findAllChat')
  // findAll() {
  //   return this.chatService.findAll();
  // }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id);
  // }
}
