import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MsgService } from './msg.service';
import { Message } from './message.type';

@Controller('msg')
export class MsgController {
  constructor(private readonly msgService: MsgService) {}

  async sendmsg(msg:Message){
    
  }
}
