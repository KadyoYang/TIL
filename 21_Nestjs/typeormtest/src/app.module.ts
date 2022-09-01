import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FivoModule } from "./fivo/fivo.module";
import { KctcModule } from "./kctc/kctc.module";
import { NestedModule } from "./nested/nested.module";

@Module({
  imports: [
    FivoModule,
    KctcModule,
    NestedModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "test",
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
