import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ChatsEntity } from 'src/modules/chats/entities/chats.entity';
import { MessagesEntity } from 'src/modules/chats/entities/messages.entity';
import { UsersEntity } from 'src/modules/users/entities/users.entity';

export const TypeOrmConfigService = (): TypeOrmModuleAsyncOptions => ({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('PG_HOST'),
    port: +configService.get('PG_PORT'),
    username: configService.get('PG_USERNAME'),
    password: configService.get('PG_PASSWORD'),
    database: configService.get('PG_DATABASE'),
    entities: [UsersEntity, ChatsEntity, MessagesEntity],
    autoLoadEntities: process.env.NODE_ENV === 'production' ? false : true,
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
});
