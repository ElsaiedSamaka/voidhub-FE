import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.css'],
})
export class SwitchThemeComponent implements OnInit {
  theme: string = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {}
  toggleTheme() {
    // this.getCurrentTheme();
    const themeToSet = this.theme == 'dark' ? 'light' : 'dark';
    this.themeService.toggleTheme(themeToSet);
  }
}
