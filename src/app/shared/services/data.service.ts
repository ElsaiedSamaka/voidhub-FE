import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from './theme.service';

@Injectable()
export class DataService {
  showSideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private themeService: ThemeService) {}
  subscribeToTheme(): string {
    let theme = '';
    this.themeService.theme$.subscribe((theme) => {
      theme = theme;
    });
    return theme;
  }
}
