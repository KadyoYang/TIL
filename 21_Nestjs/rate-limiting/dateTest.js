"use strict";
exports.__esModule = true;
var dayjs_1 = require("dayjs");
var utc_1 = require("dayjs/plugin/utc");
var timezone_1 = require("dayjs/plugin/timezone");
dayjs_1["default"].extend(utc_1["default"]);
dayjs_1["default"].extend(timezone_1["default"]);
var DateTest = /** @class */ (function () {
    function DateTest() {
    }
    DateTest.dateTest = function () {
        console.log("### DATE test");
        var date = new Date();
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
        console.log("# 시간을 15로 설정"); // 한국시간 15시로 인식을 한다
        date.setHours(15);
        // date.setUTCHour()
        console.log(date.getHours());
        console.log(date.getUTCHours());
        // 시간을 받는다 
        console.log("날자 받기 테스트");
        var parsedDate = new Date("2022-01-02"); // 시간을 안줬는데 그냥 UTC 0시로 맞춰서 된다
        console.log(parsedDate.getHours());
        console.log(parsedDate.getUTCHours());
        console.log(parsedDate.toUTCString());
        console.log(parsedDate.toISOString());
        console.log(parsedDate.toLocaleString());
        console.log("시간도 같이 받기 테스트");
        var parsedDateWithTime = new Date("2022-01-02T15:26:00"); // 들어온 시간이 한국시간인줄 콤퓨타는 안다
        console.log(parsedDateWithTime);
        console.log(parsedDateWithTime.toISOString());
        console.log(parsedDateWithTime.toUTCString());
        console.log(parsedDateWithTime.getHours());
        console.log(parsedDateWithTime.getUTCHours());
    };
    DateTest.dayjsTest = function () {
        console.log("################# dayjs test");
        var d1 = (0, dayjs_1["default"])();
        console.log("출력 테스트");
        console.log(d1);
        console.log(d1.format("YYYY-MM-DDTHH:mm:ss"));
        console.log(d1.format());
        console.log(d1.toDate());
        console.log("dayjs 날짜받기 ");
        var d2 = (0, dayjs_1["default"])("2022-05-10"); // 들어온 시간을 한국시간 5-10 00시로 인식을 했다 
        console.log(d2.toString());
        console.log(d2.toISOString());
        console.log(d2.format("YYYY-MM-DDTHH:mm:ss"));
        console.log(d2.format());
        console.log(d2.hour());
        console.log("dayjs 날짜랑시간받기");
        var d3 = (0, dayjs_1["default"])("2022-05-10T20:00:00"); // 들어오는 시간이 한국시간인지를 안다 
        console.log(d3.toString());
        console.log(d3.format());
        console.log(d3.hour());
        console.log("dayjs utcOffset");
        console.log((0, dayjs_1["default"])().utcOffset(8).hour());
        console.log((0, dayjs_1["default"])().utcOffset(9).hour());
        console.log((0, dayjs_1["default"])().utcOffset(10).hour());
        console.log("dayjs to date");
        console.log("dayjs utcOffset");
        console.log((0, dayjs_1["default"])().utcOffset(8).toDate());
        console.log((0, dayjs_1["default"])().utcOffset(9).toDate());
        console.log((0, dayjs_1["default"])().utcOffset(10).toDate());
        console.log("keep local time");
        console.log((0, dayjs_1["default"])().utcOffset(0, true).toISOString());
        // dayjs()의 timezone 9 그런데 utcOffset(0, true) 오프셋 0으로 바꿔주세요 로컬타임 그대로 가져갈게요
        // 그러면 로컬타임이 저 utcOffset(nuber) number의 타임존의 시간으로 간주되는것임
        console.log("date to dayjs");
        console.log((0, dayjs_1["default"])(new Date()).hour());
        console.log((0, dayjs_1["default"])(new Date()).utcOffset(8, false).hour());
        console.log((0, dayjs_1["default"])(new Date()).utcOffset(8, true).hour()); // 고약한놈 타임존 자기네꺼를 쓰면서 우리 시간을 뺏어가
        console.log((0, dayjs_1["default"])(new Date()).toISOString());
    };
    return DateTest;
}());
DateTest.dateTest();
DateTest.dayjsTest();
