"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateAmmoParam = exports.AmmoQuantityAndSoldierId = exports.AmmoAndQuantityParam = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var enum_1 = require("./entity/enum");
var AmmoAndQuantityParam = /** @class */ (function () {
    function AmmoAndQuantityParam() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ "enum": enum_1.AmmoType })
    ], AmmoAndQuantityParam.prototype, "ammoType");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.Min)(1)
    ], AmmoAndQuantityParam.prototype, "quantity");
    return AmmoAndQuantityParam;
}());
exports.AmmoAndQuantityParam = AmmoAndQuantityParam;
var AmmoQuantityAndSoldierId = /** @class */ (function () {
    function AmmoQuantityAndSoldierId() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], AmmoQuantityAndSoldierId.prototype, "soldierId");
    __decorate([
        (0, swagger_1.ApiProperty)({ "enum": enum_1.AmmoType })
    ], AmmoQuantityAndSoldierId.prototype, "ammoType");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.Min)(1)
    ], AmmoQuantityAndSoldierId.prototype, "quantity");
    return AmmoQuantityAndSoldierId;
}());
exports.AmmoQuantityAndSoldierId = AmmoQuantityAndSoldierId;
var UpdateAmmoParam = /** @class */ (function () {
    function UpdateAmmoParam() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ type: [AmmoQuantityAndSoldierId] }),
        (0, class_transformer_1.Type)(function () { return AmmoQuantityAndSoldierId; })
    ], UpdateAmmoParam.prototype, "data");
    return UpdateAmmoParam;
}());
exports.UpdateAmmoParam = UpdateAmmoParam;
