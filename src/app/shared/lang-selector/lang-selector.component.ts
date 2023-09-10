import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.css'],
})
export class LangSelectorComponent implements OnInit {
  showLangDDL: boolean = false;
  constructor(private translate: TranslateService) {}

  ngOnInit() {}
  changeLanguage(language: string) {
    this.translate.use(language);
  }
  toggleLangDDL(): void {
    this.showLangDDL = !this.showLangDDL;
  }
}
