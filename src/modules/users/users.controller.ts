import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { AddUserDto } from './inputs/add.user.dto';
import { AddUserViewModel } from './view/add.user.view.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  async addUser(@Body() dto: AddUserDto): Promise<AddUserViewModel> {
    return await this.usersService.add(dto.username);
  }
}
