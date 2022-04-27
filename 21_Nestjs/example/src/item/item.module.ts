import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { ItemController } from './item.controller';
import { ItemEntity } from './item.entity';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [
    TypeOrmModule.forFeature([ItemRepository, UserRepository]),
    UserModule,
  ],
})
export class ItemModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/item', method: RequestMethod.POST },
        { path: '/item/:itemId/buy', method: RequestMethod.POST },
      );
  }
}
