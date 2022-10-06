import {
  Body,
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { RequestGreetings } from "./app.dto";
import { AppService } from "./app.service";
import { MallArray, Malls } from "./const/con";
import { DantoDanto, interinter } from "./dto/dto";
import { GetNumber } from "./dto/enum";
export interface RequestReturningInvoices {
  orderIds: Array<number>;
  mall: Malls;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getSomeTTT(@Body() payload: RequestReturningInvoices) {
    const { orderIds, mall } = payload;
    console.log(orderIds, mall);

    const channelId = MallArray.find((v) => v.name === mall).id;

    console.log(channelId);
  }

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
}
