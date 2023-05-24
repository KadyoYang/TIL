"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.KctcModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var ammo_entity_1 = require("./entity/ammo.entity");
var soldier_entity_1 = require("./entity/soldier.entity");
var kctc_controller_1 = require("./kctc.controller");
var kctc_service_1 = require("./kctc.service");
var KctcModule = /** @class */ (function () {
    function KctcModule() {
    }
    KctcModule = __decorate([
        (0, common_1.Module)({
            controllers: [kctc_controller_1.KctcController],
            providers: [kctc_service_1.KctcService],
            imports: [typeorm_1.TypeOrmModule.forFeature([ammo_entity_1.Ammo, soldier_entity_1.Soldier])],
            exports: []
        })
    ], KctcModule);
    return KctcModule;
}());
exports.KctcModule = KctcModule;
