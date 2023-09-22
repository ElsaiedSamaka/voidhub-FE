import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-lang-mode-settings',
  templateUrl: './lang-mode-settings.component.html',
  styleUrls: ['./lang-mode-settings.component.css'],
})
export class LangModeSettingsComponent implements OnInit {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // this.themeService.theme$.subscribe((theme) => {
    //   this.currentTheme = theme;
    // });
  }
  toggleTheme(event: Event) {
    const themeToSet = event.target['value'];
    this.themeService.setTheme(themeToSet);
  }
}
