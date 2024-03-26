import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  constructor() { }

  processOptionalStrings(field: string) {
    if (field == '') {
      field = null;
    }
    return field;
  }

  generateDatePlusSettedInterval(interval: number) {
    const newDate = new Date(new Date().getTime() + interval * 60 * 1000);
    return newDate;
  }
}
