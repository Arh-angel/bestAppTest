import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './common/configs/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { ChatsModule } from './modules/chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    UsersModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
