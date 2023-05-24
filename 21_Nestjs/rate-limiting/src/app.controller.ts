import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { RequestGreetings } from "./app.dto";
import { AppService } from "./app.service";
import { MallArray, Malls } from "./const/con";
import { DantoDanto, interinter } from "./dto/dto";
import { GetNumber } from "./dto/enum";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { ThrottlerUserIdGuard } from "./common/customThrottler";
import { Cron } from "@nestjs/schedule";
export interface RequestReturningInvoices {
  orderIds: Array<number>;
  mall: Malls;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 0 10-50/10 * * * *
  @Cron("45 10-46/10 * * * *", { timeZone: "Asia/Seoul" })
  async cucucuron() {
    console.log("시작시작시작", new Date());
    this.getHello();
  }

  @Post()
  async getSomeTTT(@Body() payload: RequestReturningInvoices) {
    const { orderIds, mall } = payload;
    console.log(orderIds, mall);

    const channelId = MallArray.find((v) => v.name === mall).id;

    console.log(channelId);
  }

  @UseGuards(ThrottlerUserIdGuard)
  @Throttle(5, 5)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get(":num")
  // async numTest(@Param("num") num: number): Promise<number> {
  //   try {
  //     return this.appService.getException(num);
  //   } catch (err) {
  //     if (err instanceof HttpException) {
  //       throw err;
  //     }
  //     throw new InternalServerErrorException("몰라");
  //   }
  // }

  @Post("dantodanto")
  async danto(@Body() payload: DantoDanto) {
    const { mall, orderId } = payload;
    return `몰을 ${mall} 아이디는 ${orderId}`;
  }

  @Post("interface")
  async interinter(@Body() payload: interinter) {
    return payload;
  }

  @Get("aaa")
  async getNumber(@Query() payload: GetNumber) {
    console.log(payload);
    return payload;
  }

  @Get("maple")
  async getMaple() {
    return true;
  }

  @Get("starcraft/get")
  async startcrafget() {
    return {
      msg: "this is get",
    };
  }

  @Get("starcraft/hakoshipda")
  async startcraftHakoshipda(@Query() payload: RequestGreetings) {
    const { greetings, howMany } = payload;
    let result = "";
    for (let i = 0; i < howMany; i++) {
      result += greetings;
    }
    return {
      greetings: greetings,
      howMany: howMany,
      result: result,
    };
  }
  @Get("starcraft/hakoshipda/:count")
  async startcraftHakoshipdacount(
    @Query() payload: RequestGreetings,
    @Param("count") count: number
  ) {
    const { greetings, howMany } = payload;
    let result = "";
    for (let i = 0; i < howMany; i++) {
      result += greetings;
    }
    return {
      greetings: greetings,
      howMany: howMany,
      result: result,
      count: count,
    };
  }

  @Post("csgo/post")
  async csgoHakoshipdagetPost() {
    return {
      msg: "this is post",
    };
  }

  @Post("csgo/hakoshipda")
  async csgoHakoshipda(@Body() payload: RequestGreetings) {
    const { greetings, howMany } = payload;
    let result = "";
    for (let i = 0; i < howMany; i++) {
      result += greetings;
    }
    return {
      greetings: greetings,
      howMany: howMany,
      result: result,
    };
  }

  @Post("csgo/hakoshipda/:count")
  async csgoHakoshipdacount(
    @Body() payload: RequestGreetings,
    @Param("count") count: number
  ) {
    const { greetings, howMany } = payload;
    let result = "";
    for (let i = 0; i < howMany; i++) {
      result += greetings;
    }
    return {
      greetings: greetings,
      howMany: howMany,
      result: result,
      count: count,
    };
  }

  @Patch("patch/hakoshipda")
  async patchHakoshipda(@Body() payload: RequestGreetings) {
    const { greetings, howMany } = payload;
    let result = "";
    for (let i = 0; i < howMany; i++) {
      result += greetings;
    }
    return {
      greetings: greetings,
      howMany: howMany,
      result: result,
    };
  }

  @Put("put/hakoshipda")
  async putHakoshipda(@Body() payload: RequestGreetings) {
    const { greetings, howMany } = payload;
    let result = "";
    for (let i = 0; i < howMany; i++) {
      result += greetings;
    }
    return {
      greetings: greetings,
      howMany: howMany,
      result: result,
    };
  }

  @Get("blank")
  async getget() {
    console.log("1");
  }

  @Post("blank")
  async postpost() {
    console.log("2");
  }

  @Put("blank")
  async putput() {
    console.log("3");
  }

  @Patch("blank")
  async patchpatch() {
    console.log("4");
  }

  @Delete("blank")
  async deletedelte() {
    console.log("5");
  }

  @Get("object")
  async getObject() {
    return [];
  }

  @Get("list")
  async getList() {
    const a = [
      { a: 123, b: "asd" },
      { a: 234, b: "duu" },
    ];
    const b = ["a", "b", "c"];
    return a;
  }
}
