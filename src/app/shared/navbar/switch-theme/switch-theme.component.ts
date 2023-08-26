import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.css'],
})
export class SwitchThemeComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {}
  toggleTheme(themeToSet: string) {
    console.log('themeToSet', themeToSet);
    this.themeService.setTheme(themeToSet);
  }
}
