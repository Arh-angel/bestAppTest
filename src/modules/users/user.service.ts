import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { AddUserViewModel } from './view/add.user.view.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async add(username: string): Promise<AddUserViewModel> {
    const user: UsersEntity = await this.usersRepository.findOne({
      where: { username },
    });

    if (user)
      throw new BadRequestException(
        'Пользователь с таким username уже существует!',
      );

    const newUser = await this.usersRepository.save({
      id: randomUUID(),
      username,
    });

    return { id: newUser.id };
  }
}
