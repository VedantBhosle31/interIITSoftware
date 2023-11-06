import { Injectable } from '@nestjs/common';
import { WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { getChatRoomId } from 'src/utils';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  sendMessage(payload: any, server: Server, roomId: string) {
    server.emit('message', payload);
  }
}
