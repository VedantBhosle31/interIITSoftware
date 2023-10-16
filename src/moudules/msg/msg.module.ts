import { Module } from '@nestjs/common';
import { MsgService } from './msg.service';
import { MsgController } from './msg.controller';
import { Prisma } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [PrismaModule, ChatModule],
  controllers: [MsgController],
  providers: [MsgService],
})
export class MsgModule { }
