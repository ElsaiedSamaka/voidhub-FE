import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  showSideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAnonymous$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  FYI$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() {}
}
