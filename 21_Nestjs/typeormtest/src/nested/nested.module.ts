import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NestedController } from "./nested.controller";
import { Parent } from "./parent.entity";
import { NestedService } from "./nested.service";
import { Child } from "./child.entity";

@Module({
  controllers: [NestedController],
  providers: [NestedService],
  imports: [TypeOrmModule.forFeature([Parent, Child])],
  exports: [],
})
export class NestedModule {}
