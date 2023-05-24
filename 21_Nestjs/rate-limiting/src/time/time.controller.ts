import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Validate } from "class-validator";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { TimeTestParam } from "./time.dto";
import {
  AdminListResult,
  ApiOkResponseAdminListResult,
  ApiOkResponseResultFindAndCount,
  Data,
  Human,
  ResultFindAndCount,
  SomeParam,
} from "src/dto/dto";
import { Parent } from "src/dto/parent.entity";
import { Child } from "src/dto/child.entity";
import { GetHoursParam } from "src/dto/man.entity";
import { ThrottlerGuard } from "@nestjs/throttler";
import { ThrottlerUserIdGuard } from "src/common/customThrottler";

dayjs.extend(utc);
dayjs.extend(tz);

@ApiTags("time")
@Controller("time")
export class TimeController {
  constructor() {}

  @UseGuards(ThrottlerUserIdGuard)
  @Get()
  async timeTest1() {
    console.log("### DATE test");
    return;
    let date = new Date();
    console.log(date.getTimezoneOffset()); // utc - local
    console.log("# 그냥, toIso, toUtc, toLocal 출력");
    console.log(date);
    console.log(date.toISOString());
    console.log(date.toUTCString());
    console.log(date.toLocaleString());

    // date 시간 출력
    console.log("# getHours(), getUTCHours()");
    console.log(date.getHours());
    console.log(date.getUTCHours());

    // date setHours
    console.log("# 시간을 15로 설정");
    date.setHours(15);
    // date.setUTCHour()
    console.log(date.getHours());
    console.log(date.getUTCHours());

    // 시간을 받는다
    console.log("날자 받기 테스트");
    let parsedDate = new Date("2022-01-02");
    console.log(parsedDate.getHours());
    console.log(parsedDate.getUTCHours());
    console.log(parsedDate.toUTCString());
    console.log(parsedDate.toISOString());
    console.log(parsedDate.toLocaleString());

    console.log("시간도 같이 받기 테스트");
    let parsedDateWithTime = new Date("2022-01-02T15:26:00");
    console.log(parsedDateWithTime);
    console.log(parsedDateWithTime.toISOString());
    console.log(parsedDateWithTime.toUTCString());
    console.log(parsedDateWithTime.getHours());
    console.log(parsedDateWithTime.getUTCHours());

    // ##################### DAY JS
    console.log("################# dayjs test");
    let d1 = dayjs();

    console.log("출력 테스트");
    console.log(d1);
    console.log(d1.format("YYYY-MM-DDTHH:mm:ss"));
    console.log(d1.format());
    console.log(d1.toDate());

    console.log("dayjs 날짜받기 ");
    let d2 = dayjs("2022-05-10");
    console.log(d2.toString());
    console.log(d2.toISOString());
    console.log(d2.format("YYYY-MM-DDTHH:mm:ss"));
    console.log(d2.format());
    console.log(d2.hour());

    console.log("dayjs 날짜랑시간받기");
    let d3 = dayjs("2022-05-10T20:00:00");
    console.log(d3.toString());
    console.log(d3.format());
    console.log(d3.hour());
  }

  @Post()
  async timeTest2(@Body() timeTestParam: TimeTestParam) {
    console.log("---timeTest2 시작---");
    console.log(timeTestParam.datetime);
    console.log(timeTestParam.datetime.getUTCHours());
    console.log(timeTestParam.datetime.getHours());
    console.log(timeTestParam.datetime.toISOString());

    console.log(dayjs(timeTestParam.datetime));
    console.log(dayjs(timeTestParam.datetime).toISOString());
    console.log(dayjs(timeTestParam.datetime).hour());
  }

  @Post("um")
  async yoman(@Body() payload: SomeParam) {
    return true;
  }

  @Get("aaa")
  @ApiOkResponseResultFindAndCount(Data)
  async aaa(): Promise<ResultFindAndCount<Data>> {
    return {
      list: [new Data(), new Data()],
      total: 131,
    };
  }

  @Get("aaa2")
  @ApiOkResponseResultFindAndCount(Human)
  async aaa2(): Promise<AdminListResult<Human>> {
    return {
      list: [new Data(), new Data()],
      total: 131,
      address: {
        count: 5,
        name: "머머시",
      },
    };
  }

  @Get("nonono")
  async nonono(): Promise<AdminListResult<Human>> {
    return {
      list: [new Data(), new Data()],
      total: 131,
      address: {
        count: 5,
        name: "머머시",
      },
    };
  }

  @Get("parent")
  @ApiOkResponse({ type: Parent, isArray: false })
  async getParent(): Promise<Parent> {
    return null;
  }

  @Get("child")
  @ApiOkResponse({ type: Child, isArray: true })
  async getChild(): Promise<Child[]> {
    return null;
  }

  @Get("hours")
  async getHours(@Query() param: GetHoursParam) {
    console.log(param.offset);
    // console.log(param.hours.length);
    return param;
  }

  // 로컬에서 돌리면 내 계획대로 돌아간다
  // curl -X GET http://172.19.144.1:8080/time
  // curl -X POST http://172.19.144.1:8080/time -H 'Content-Type: application/json' -d '{"datetime":"2022-10-20T10:22:22"}'
  // curl -X POST http://172.19.144.1:8080/time -H 'Content-Type: application/json' -d '{"datetime":"2022-10-20T10:22:22Z"}'
  // curl -X POST http://172.19.144.1:8080/time -H 'Content-Type: application/json' -d '{"datetime":"2022-10-20T10:22:22+0900"}'
}
