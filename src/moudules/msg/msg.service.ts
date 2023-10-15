import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from './message.type';
import { ChatGateway } from '../chat/chat.gateway';
import { Filter } from 'bad-words';

@Injectable()
export class MsgService {
  constructor(private prisma: PrismaService, private chatgateway: ChatGateway) {

  }

  async sendmsg(msg: Message) {

    const result = await this.prisma.message.create({
      data: {
        body: Filter.clean(msg.body),
        author: { connect: { id: msg.author } },
        receiver: { connect: { id: msg.receiver } },
      }
    })
    this.chatgateway.sendMessage(result)
    return result
  }

}
