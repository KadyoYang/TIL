"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TimeController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var dayjs_1 = require("dayjs");
var utc_1 = require("dayjs/plugin/utc");
var timezone_1 = require("dayjs/plugin/timezone");
dayjs_1["default"].extend(utc_1["default"]);
dayjs_1["default"].extend(timezone_1["default"]);
var TimeController = /** @class */ (function () {
    function TimeController() {
    }
    TimeController.prototype.timeTest1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, parsedDate, parsedDateWithTime, d1, d2, d3;
            return __generator(this, function (_a) {
                console.log("### DATE test");
                date = new Date();
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
                parsedDate = new Date("2022-01-02");
                console.log(parsedDate.getHours());
                console.log(parsedDate.getUTCHours());
                console.log(parsedDate.toUTCString());
                console.log(parsedDate.toISOString());
                console.log(parsedDate.toLocaleString());
                console.log("시간도 같이 받기 테스트");
                parsedDateWithTime = new Date("2022-01-02T15:26:00");
                console.log(parsedDateWithTime);
                console.log(parsedDateWithTime.toISOString());
                console.log(parsedDateWithTime.toUTCString());
                console.log(parsedDateWithTime.getHours());
                console.log(parsedDateWithTime.getUTCHours());
                // ##################### DAY JS 
                console.log("################# dayjs test");
                d1 = (0, dayjs_1["default"])();
                console.log("출력 테스트");
                console.log(d1);
                console.log(d1.format("YYYY-MM-DDTHH:mm:ss"));
                console.log(d1.format());
                console.log(d1.toDate());
                console.log("dayjs 날짜받기 ");
                d2 = (0, dayjs_1["default"])("2022-05-10");
                console.log(d2.toString());
                console.log(d2.toISOString());
                console.log(d2.format("YYYY-MM-DDTHH:mm:ss"));
                console.log(d2.format());
                console.log(d2.hour());
                console.log("dayjs 날짜랑시간받기");
                d3 = (0, dayjs_1["default"])("2022-05-10T20:00:00");
                console.log(d3.toString());
                console.log(d3.format());
                console.log(d3.hour());
                return [2 /*return*/];
            });
        });
    };
    TimeController.prototype.timeTest2 = function (timeTestParam) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("---timeTest2 시작---");
                console.log(timeTestParam.datetime);
                console.log(timeTestParam.datetime.getUTCHours());
                console.log(timeTestParam.datetime.getHours());
                console.log(timeTestParam.datetime.toISOString());
                console.log((0, dayjs_1["default"])(timeTestParam.datetime));
                console.log((0, dayjs_1["default"])(timeTestParam.datetime).toISOString());
                console.log((0, dayjs_1["default"])(timeTestParam.datetime).hour());
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        (0, common_1.Get)()
    ], TimeController.prototype, "timeTest1");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], TimeController.prototype, "timeTest2");
    TimeController = __decorate([
        (0, swagger_1.ApiTags)('time'),
        (0, common_1.Controller)('time')
    ], TimeController);
    return TimeController;
}());
exports.TimeController = TimeController;
