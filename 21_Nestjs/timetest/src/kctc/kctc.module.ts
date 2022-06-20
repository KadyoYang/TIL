import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ammo } from './entity/ammo.entity';
import { Soldier } from './entity/soldier.entity';
import { KctcController } from './kctc.controller';
import { KctcService } from './kctc.service';



@Module({
    controllers: [KctcController],
    providers: [KctcService],
    imports: [TypeOrmModule.forFeature([Ammo, Soldier])],
    exports: [],
})
export class KctcModule {

}
