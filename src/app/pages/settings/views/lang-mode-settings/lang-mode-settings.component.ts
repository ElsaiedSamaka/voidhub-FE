import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lang-mode-settings',
  templateUrl: './lang-mode-settings.component.html',
  styleUrls: ['./lang-mode-settings.component.css'],
})
export class LangModeSettingsComponent implements OnInit {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  constructor() {}

  ngOnInit() {}
}
