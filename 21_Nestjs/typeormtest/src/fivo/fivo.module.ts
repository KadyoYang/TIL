import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FivoController } from './fivo.controller';
import { Fivo } from './fivo.entity';
import { FivoService } from './fivo.service';


@Module({
  controllers: [FivoController],
  providers: [FivoService],
  imports: [TypeOrmModule.forFeature([Fivo])],
  exports: [],
})
export class FivoModule {

}
