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
exports.KctcService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var ammo_entity_1 = require("./entity/ammo.entity");
var soldier_entity_1 = require("./entity/soldier.entity");
var KctcService = /** @class */ (function () {
    function KctcService(connection) {
        this.connection = connection;
    }
    KctcService.prototype.getSoldiers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.manager.find(soldier_entity_1.Soldier)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    KctcService.prototype.addSoldier = function (addSoldierParam) {
        return __awaiter(this, void 0, void 0, function () {
            var ammoType, quantity, ammo, soldier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ammoType = addSoldierParam.ammoType, quantity = addSoldierParam.quantity;
                        return [4 /*yield*/, this.connection.manager.findOne(ammo_entity_1.Ammo, { where: { ammoType: ammoType } })];
                    case 1:
                        ammo = _a.sent();
                        if (!ammo) {
                            throw new common_1.HttpException("given ammo does not exist", 400);
                        }
                        if (ammo.availableQuantity - quantity < 0) {
                            throw new common_1.HttpException('lack of ammo', 400);
                        }
                        soldier = this.connection.manager.create(soldier_entity_1.Soldier, { ammoType: ammoType, quantity: quantity });
                        ammo.availableQuantity -= quantity;
                        ammo.takenQuantity += quantity;
                        return [4 /*yield*/, this.connection.manager.save(soldier)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.connection.manager.save(ammo)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KctcService.prototype.deleteSoldier = function (soldierId) {
        return __awaiter(this, void 0, void 0, function () {
            var solider, ammo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.manager.findOne(soldier_entity_1.Soldier, soldierId)];
                    case 1:
                        solider = _a.sent();
                        return [4 /*yield*/, this.connection.manager.findOne(ammo_entity_1.Ammo, { where: { ammoType: solider.ammoType } })];
                    case 2:
                        ammo = _a.sent();
                        ammo.availableQuantity += solider.quantity;
                        ammo.takenQuantity -= solider.quantity;
                        return [4 /*yield*/, this.connection.manager.remove(solider)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.connection.manager.save(ammo)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KctcService.prototype.getAmmos = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.manager.find(ammo_entity_1.Ammo)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    KctcService.prototype.addAmmo = function (addAmmoParam) {
        return __awaiter(this, void 0, void 0, function () {
            var ammo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(addAmmoParam);
                        return [4 /*yield*/, this.connection.manager.findOne(ammo_entity_1.Ammo, { where: { ammoType: addAmmoParam.ammoType } })];
                    case 1:
                        if (_a.sent()) {
                            throw new common_1.HttpException("given ammoType is aleady exist", 400);
                        }
                        ammo = this.connection.manager.create(ammo_entity_1.Ammo, { ammoType: addAmmoParam.ammoType, totalQuantity: addAmmoParam.quantity, availableQuantity: addAmmoParam.quantity, takenQuantity: 0 });
                        return [4 /*yield*/, this.connection.manager.save(ammo)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KctcService.prototype.redistributionAmmo = function (updateDat) {
        var e_1, _a, e_2, _b;
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, _c, _d, dat, soldier, beforeAmmo, e_1_1, _e, _f, dat, soldier, afterAmmo, e_2_1, error_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        queryRunner = this.connection.createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _g.sent();
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 35, 37, 39]);
                        _g.label = 4;
                    case 4:
                        _g.trys.push([4, 12, 13, 18]);
                        _c = __asyncValues(updateDat.data);
                        _g.label = 5;
                    case 5: return [4 /*yield*/, _c.next()];
                    case 6:
                        if (!(_d = _g.sent(), !_d.done)) return [3 /*break*/, 11];
                        dat = _d.value;
                        return [4 /*yield*/, queryRunner.manager.findOne(soldier_entity_1.Soldier, dat.soldierId)];
                    case 7:
                        soldier = _g.sent();
                        return [4 /*yield*/, queryRunner.manager.findOne(ammo_entity_1.Ammo, { where: { ammoType: soldier.ammoType } })];
                    case 8:
                        beforeAmmo = _g.sent();
                        beforeAmmo.availableQuantity += soldier.quantity;
                        beforeAmmo.takenQuantity -= soldier.quantity;
                        // 불출 탄약 원복
                        return [4 /*yield*/, queryRunner.manager.save(beforeAmmo)];
                    case 9:
                        // 불출 탄약 원복
                        _g.sent();
                        _g.label = 10;
                    case 10: return [3 /*break*/, 5];
                    case 11: return [3 /*break*/, 18];
                    case 12:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 18];
                    case 13:
                        _g.trys.push([13, , 16, 17]);
                        if (!(_d && !_d.done && (_a = _c["return"]))) return [3 /*break*/, 15];
                        return [4 /*yield*/, _a.call(_c)];
                    case 14:
                        _g.sent();
                        _g.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 17: return [7 /*endfinally*/];
                    case 18:
                        _g.trys.push([18, 27, 28, 33]);
                        _e = __asyncValues(updateDat.data);
                        _g.label = 19;
                    case 19: return [4 /*yield*/, _e.next()];
                    case 20:
                        if (!(_f = _g.sent(), !_f.done)) return [3 /*break*/, 26];
                        dat = _f.value;
                        return [4 /*yield*/, queryRunner.manager.findOne(soldier_entity_1.Soldier, dat.soldierId)];
                    case 21:
                        soldier = _g.sent();
                        return [4 /*yield*/, queryRunner.manager.findOne(ammo_entity_1.Ammo, { where: { ammoType: dat.ammoType } })];
                    case 22:
                        afterAmmo = _g.sent();
                        afterAmmo.availableQuantity -= dat.quantity;
                        afterAmmo.takenQuantity += dat.quantity;
                        // 탄약 불출
                        if (afterAmmo.availableQuantity < 0) {
                            throw new common_1.HttpException('availableQuantity can not be less than zero', 400);
                        }
                        soldier.ammoType = dat.ammoType;
                        soldier.quantity = dat.quantity;
                        return [4 /*yield*/, queryRunner.manager.save(afterAmmo)];
                    case 23:
                        _g.sent();
                        return [4 /*yield*/, queryRunner.manager.save(soldier)];
                    case 24:
                        _g.sent();
                        _g.label = 25;
                    case 25: return [3 /*break*/, 19];
                    case 26: return [3 /*break*/, 33];
                    case 27:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 33];
                    case 28:
                        _g.trys.push([28, , 31, 32]);
                        if (!(_f && !_f.done && (_b = _e["return"]))) return [3 /*break*/, 30];
                        return [4 /*yield*/, _b.call(_e)];
                    case 29:
                        _g.sent();
                        _g.label = 30;
                    case 30: return [3 /*break*/, 32];
                    case 31:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 32: return [7 /*endfinally*/];
                    case 33: return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 34:
                        _g.sent();
                        return [3 /*break*/, 39];
                    case 35:
                        error_1 = _g.sent();
                        console.error(error_1);
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 36:
                        _g.sent();
                        throw new common_1.HttpException('availableQuantity can not be less than zero', 400);
                    case 37: return [4 /*yield*/, queryRunner.release()];
                    case 38:
                        _g.sent();
                        console.log("finally");
                        return [7 /*endfinally*/];
                    case 39: return [2 /*return*/];
                }
            });
        });
    };
    KctcService.prototype.deleteAllTestData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.createQueryBuilder()["delete"]().from(soldier_entity_1.Soldier).execute()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connection.createQueryBuilder()["delete"]().from(ammo_entity_1.Ammo).execute()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KctcService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectConnection)())
    ], KctcService);
    return KctcService;
}());
exports.KctcService = KctcService;
