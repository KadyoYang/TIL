"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Ammo = void 0;
var typeorm_1 = require("typeorm");
var enum_1 = require("./enum");
var Ammo = /** @class */ (function () {
    function Ammo() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Ammo.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": enum_1.AmmoType,
            "default": enum_1.AmmoType.etc
        })
    ], Ammo.prototype, "ammoType");
    __decorate([
        (0, typeorm_1.Column)()
    ], Ammo.prototype, "totalQuantity");
    __decorate([
        (0, typeorm_1.Column)()
    ], Ammo.prototype, "availableQuantity");
    __decorate([
        (0, typeorm_1.Column)()
    ], Ammo.prototype, "takenQuantity");
    Ammo = __decorate([
        (0, typeorm_1.Entity)()
    ], Ammo);
    return Ammo;
}());
exports.Ammo = Ammo;
