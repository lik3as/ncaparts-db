"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdFab = void 0;
const produto_1 = require("./produto");
const fabricante_1 = require("./fabricante");
const sequelize_typescript_1 = require("sequelize-typescript");
let ProdFab = class ProdFab extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProdFab.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => produto_1.Produto),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProdFab.prototype, "id_prod", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => fabricante_1.Fabricante),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProdFab.prototype, "id_fab", void 0);
ProdFab = __decorate([
    sequelize_typescript_1.Table
], ProdFab);
exports.ProdFab = ProdFab;
