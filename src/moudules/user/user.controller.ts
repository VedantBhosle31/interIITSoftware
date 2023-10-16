import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('findUserByName')
  findUserByName(@Body() uname: string) {
    return this.userService.findUserByName(uname)
  }

  @Get('findUserByid')
  findUserByid(@Body() id: string) {
    return this.userService.findUserByid(id)
  }

  @Post('registerUser')
  registerUser(@Body() NewUser: CreateUser) {
    return this.userService.registerUser(NewUser)
  }

  @Patch('sentFriendReq')
  sentFriendReq(@Body() myid: string, id: string) {
    return this.userService.sentFriendReq(myid, id)
  }

  @Get('getAllFriendReq')
  getAllFriendReq(@Body() id: string) {
    return this.userService.getAllFriendReq(id)
  }


  // @Post()
  // create(@Body() createUserDto: CreateUser) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
