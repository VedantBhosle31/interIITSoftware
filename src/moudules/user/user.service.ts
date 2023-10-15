import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { HashService } from './hash.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService, private hashService: HashService) { }

  async findUserByName(uname: string) {
    return await this.prisma.user.findFirst({
      where: {
        userName: uname
      }
    })
  }
  async findUserByid(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id: id
      }
    })
  }

  async registerUser(NewUser: CreateUser) {
    console.log(NewUser)
    const hashPassword = await this.hashService.hashPassword(NewUser.password)
    const check = await this.findUserByName(NewUser.username)
    if (!check) {
      return await this.prisma.user.create({
        data: {
          userName: NewUser.username,
          password: hashPassword
        }
      })
    } else {
      throw new Error("Username Already taken")
    }
  }

  async sentFriendReq(myid: string, id: string) {
    const me = await this.findUserByid(myid)
    return await this.prisma.user.update({
      where: {
        id: id
      },

      data: {
        friendRequestReceived: {
          connect: { id: myid }
        }
      }

    }
    )
  }
}
