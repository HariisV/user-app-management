"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
const common_1 = require("@nestjs/common");
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
let PaginationService = class PaginationService {
    async returnPagination(query, model, anyOption) {
        const skip = Number(isNumeric(query.skip) ? query.skip : 0);
        const take = Number(isNumeric(query.take) ? query.take : 0);
        const sortBy = query.sortBy || 'id';
        const isDesc = query.descending === 'true';
        const conditionCount = anyOption?.where ? { where: anyOption.where } : {};
        const total = await model.count(conditionCount);
        const list = await model.findMany({
            skip,
            take: take === 0 ? total : take,
            ...anyOption,
            orderBy: {
                [sortBy]: isDesc ? 'desc' : 'asc',
            },
        });
        const currentTotal = list.length || 0;
        return {
            data: {
                list,
                pagination: {
                    total,
                    skip,
                    take,
                    currentTotal,
                },
            },
            msg: 'Get all data',
        };
    }
};
exports.PaginationService = PaginationService;
exports.PaginationService = PaginationService = __decorate([
    (0, common_1.Injectable)()
], PaginationService);
//# sourceMappingURL=pagination.service.js.map