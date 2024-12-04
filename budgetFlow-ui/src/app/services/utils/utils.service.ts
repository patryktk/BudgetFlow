import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  prepareRequestDatesActiveMonth() {
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const starDate = new Date();
    starDate.setDate(1);
    const endDate = new Date(starDate);
    endDate.setMonth(starDate.getMonth() + 1);
    endDate.setDate(0);
    return {startDate: formatDate(starDate).toString(), endDate: formatDate(endDate).toString()};
  }
}
