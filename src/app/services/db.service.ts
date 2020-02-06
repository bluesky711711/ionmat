import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Data } from '../data';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService implements InMemoryDbService {

  createDb() {
    const data: Data[] = [
      { id: 1, name: 'Mumbai' },
      { id: 2, name: 'Tokyo' },
      { id: 3, name: 'Beijing'},
      { id: 4, name: 'Canberra'},
      { id: 5, name: 'Jakarta' },
      { id: 6, name: 'Manila' },
      { id: 7, name: 'New Delhi' },
      { id: 8, name: 'Shanghai' },
      { id: 9, name: 'Yangon' },
      { id: 10, name: 'Colombo' },
      { id: 11, name: 'Chennai' },
      { id: 12, name: 'Bangkok' },
      { id: 13, name: 'Ho Chi Minh City' },
      { id: 14, name: 'Taipei' },
      { id: 15, name: 'Port Moresby' }


    ];
    return {data};
  }
}
