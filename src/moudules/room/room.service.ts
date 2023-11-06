import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { User } from '@prisma/client';
import { WsResponse } from '@nestjs/websockets';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
  async createRoom(socket: Socket, server: Server, user: User) {
    try {
      const room = await this.prisma.room.create({
        data: {
          users: { create: [user] },
        },
      });
      const roomId = room.roomId;
      socket.join(roomId);
      server.to(socket.id).emit('groupCreated', { roomId });
      return roomId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async joinRoom(socket: Socket, roomId: string, server: Server, user: User) {
    try {
      const room = await this.prisma.room.findFirst({ where: { roomId } });

      await this.prisma.room.update({
        where: {
          roomId,
        },
        data: {
          users: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      socket.join(roomId);
      socket.to(roomId).emit('joined', { roomId });
      return { event: 'joined', data: roomId };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
