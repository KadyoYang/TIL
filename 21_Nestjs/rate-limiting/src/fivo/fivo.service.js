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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.FivoService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var fivo_entity_1 = require("./fivo.entity");
var idxs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var FivoService = /** @class */ (function () {
    function FivoService(connection) {
        this.connection = connection;
    }
    FivoService.prototype.getFivos = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connection.manager.find(fivo_entity_1.Fivo)];
            });
        });
    };
    FivoService.prototype.createFivos = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var idxs_1, idxs_1_1, i, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 11]);
                        idxs_1 = __asyncValues(idxs);
                        _b.label = 1;
                    case 1: return [4 /*yield*/, idxs_1.next()];
                    case 2:
                        if (!(idxs_1_1 = _b.sent(), !idxs_1_1.done)) return [3 /*break*/, 4];
                        i = idxs_1_1.value;
                        this.connection.manager.save(this.connection.manager.create(fivo_entity_1.Fivo, { id: i, amount: 0 }));
                        _b.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 6:
                        _b.trys.push([6, , 9, 10]);
                        if (!(idxs_1_1 && !idxs_1_1.done && (_a = idxs_1["return"]))) return [3 /*break*/, 8];
                        return [4 /*yield*/, _a.call(idxs_1)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 10: return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    FivoService.prototype.deleteFivos = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.connection.manager.createQueryBuilder()["delete"]().from(fivo_entity_1.Fivo).execute();
                return [2 /*return*/];
            });
        });
    };
    FivoService.prototype.calculate = function () {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, idxs_2, idxs_2_1, i, fivo, beforeFivo, beforeBeforeFivo, e_2_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryRunner = this.connection.createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 24, 26, 28]);
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 16, 17, 22]);
                        idxs_2 = __asyncValues(idxs);
                        _b.label = 5;
                    case 5: return [4 /*yield*/, idxs_2.next()];
                    case 6:
                        if (!(idxs_2_1 = _b.sent(), !idxs_2_1.done)) return [3 /*break*/, 15];
                        i = idxs_2_1.value;
                        return [4 /*yield*/, queryRunner.manager.findOne(fivo_entity_1.Fivo, i)];
                    case 7:
                        fivo = _b.sent();
                        if (!(i === 1)) return [3 /*break*/, 8];
                        fivo.amount = 1;
                        return [3 /*break*/, 12];
                    case 8:
                        if (!(i === 2)) return [3 /*break*/, 9];
                        fivo.amount = 1;
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, queryRunner.manager.findOne(fivo_entity_1.Fivo, i - 1)];
                    case 10:
                        beforeFivo = _b.sent();
                        return [4 /*yield*/, queryRunner.manager.findOne(fivo_entity_1.Fivo, i - 2)];
                    case 11:
                        beforeBeforeFivo = _b.sent();
                        fivo.amount = beforeFivo.amount + beforeBeforeFivo.amount;
                        _b.label = 12;
                    case 12: return [4 /*yield*/, queryRunner.manager.save(fivo)];
                    case 13:
                        _b.sent();
                        if (i === 10) {
                            throw new Error("음");
                        }
                        _b.label = 14;
                    case 14: return [3 /*break*/, 5];
                    case 15: return [3 /*break*/, 22];
                    case 16:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 22];
                    case 17:
                        _b.trys.push([17, , 20, 21]);
                        if (!(idxs_2_1 && !idxs_2_1.done && (_a = idxs_2["return"]))) return [3 /*break*/, 19];
                        return [4 /*yield*/, _a.call(idxs_2)];
                    case 18:
                        _b.sent();
                        _b.label = 19;
                    case 19: return [3 /*break*/, 21];
                    case 20:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 21: return [7 /*endfinally*/];
                    case 22: return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 23:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 24:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 25:
                        _b.sent();
                        return [3 /*break*/, 28];
                    case 26: return [4 /*yield*/, queryRunner.release()];
                    case 27:
                        _b.sent();
                        return [7 /*endfinally*/];
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    FivoService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectConnection)())
    ], FivoService);
    return FivoService;
}());
exports.FivoService = FivoService;
