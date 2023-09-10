import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.css'],
})
export class LangSelectorComponent implements OnInit {
  showLangDDL: boolean = false;
  selectedLang: string = 'en';
  constructor(private translate: TranslateService) {}

  ngOnInit() {}
  changeLanguage(language: string) {
    this.translate.use(language);
    switch (language) {
      case 'en':
        this.selectedLang = 'en';
        break;
      case 'ar':
        this.selectedLang = 'ar';
        break;
      default:
        break;
    }
  }
  toggleLangDDL(): void {
    this.showLangDDL = !this.showLangDDL;
  }
}
