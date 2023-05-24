import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FivoModule } from "./fivo/fivo.module";
import { KctcModule } from "./kctc/kctc.module";
import { TimeModule } from "./time/time.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TimeModule,
    // FivoModule,
    // KctcModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    ThrottlerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD, // 요 앱 가드로 쓰로틀러 가드를 물려버리면 모든 api 에 대해서 적용 되는듯
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
