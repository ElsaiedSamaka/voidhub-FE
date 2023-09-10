import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.css'],
})
export class LangSelectorComponent implements OnInit {
  showLangDDL: boolean = false;
  selectedLang: string;

  constructor(private translate: TranslateService) {
    // Get the language from local storage or set a default value
    this.selectedLang = localStorage.getItem('selectedLang') || 'en';
  }

  ngOnInit() {
    this.translate.use(this.selectedLang);
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.selectedLang = language;
    localStorage.setItem('selectedLang', language);
    this.toggleLangDDL();
  }

  toggleLangDDL(): void {
    this.showLangDDL = !this.showLangDDL;
  }
}
