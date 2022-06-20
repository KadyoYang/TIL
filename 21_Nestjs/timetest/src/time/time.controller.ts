import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Validate } from "class-validator";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { TimeTestParam } from "./time.dto";

dayjs.extend(utc);
dayjs.extend(tz);

@ApiTags('time')
@Controller('time')
export class TimeController {
    constructor() { }

    @Get()
    async timeTest1(){
        console.log("### DATE test")
        let date = new Date();
        console.log(date.getTimezoneOffset()) // utc - local
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
        console.log("# 시간을 15로 설정"); // 한국시간 15시로 인식을 한다
        date.setHours(15);
        // date.setUTCHour()
        console.log(date.getHours());
        console.log(date.getUTCHours());

        // 시간을 받는다 
        console.log("날자 받기 테스트");
        let parsedDate = new Date("2022-01-02"); // 시간을 안줬는데 그냥 UTC 0시로 맞춰서 된다
        console.log(parsedDate.getHours());
        console.log(parsedDate.getUTCHours());
        console.log(parsedDate.toUTCString());
        console.log(parsedDate.toISOString());
        console.log(parsedDate.toLocaleString());

        console.log("시간도 같이 받기 테스트")
        let parsedDateWithTime = new Date("2022-01-02T15:26:00"); // 들어온 시간이 한국시간인줄 콤퓨타는 안다
        console.log(parsedDateWithTime);
        console.log(parsedDateWithTime.toISOString());
        console.log(parsedDateWithTime.toUTCString());
        console.log(parsedDateWithTime.getHours());
        console.log(parsedDateWithTime.getUTCHours());


        // ##################### DAY JS 
        console.log("################# dayjs test")
        let d1 = dayjs();

        console.log("출력 테스트")
        console.log(d1);
        console.log(d1.format("YYYY-MM-DDTHH:mm:ss"));
        console.log(d1.format());
        console.log(d1.toDate());

        console.log("dayjs 날짜받기 ")
        let d2 = dayjs("2022-05-10"); // 들어온 시간을 한국시간 5-10 00시로 인식을 했다 
        console.log(d2.toString());
        console.log(d2.toISOString());
        console.log(d2.format("YYYY-MM-DDTHH:mm:ss"));
        console.log(d2.format());
        console.log(d2.hour());

        console.log("dayjs 날짜랑시간받기");
        let d3 = dayjs("2022-05-10T20:00:00"); // 들어오는 시간이 한국시간인지를 안다 
        console.log(d3.toString());
        console.log(d3.format());
        console.log(d3.hour());
    }

    @Post()
    async timeTest2(@Body() timeTestParam:TimeTestParam) {
        console.log("---timeTest2 시작---");
    }

  

}