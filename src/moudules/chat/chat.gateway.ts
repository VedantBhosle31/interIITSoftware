import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Body, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Message } from '../msg/message.type';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
  socket: Socket;
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.socket = socket;
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('createGroup')
  create() {
    return this.chatService.createRoom(this.socket, this.server);
  }

  @SubscribeMessage('joinGroup')
  join(@MessageBody() roomId: string) {
    return this.chatService.joinRoom(this.socket, roomId, this.server);
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
