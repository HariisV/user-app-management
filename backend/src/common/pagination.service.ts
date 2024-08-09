import { Injectable } from '@nestjs/common';

function isNumeric(value: any) {
  return /^-?\d+$/.test(value);
}

@Injectable()
export class PaginationService {
  async returnPagination(
    query: any,
    model: any,
    anyOption?: any,
  ): Promise<any> {
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
}
