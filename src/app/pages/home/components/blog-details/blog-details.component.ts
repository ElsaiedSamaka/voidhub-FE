import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  data: any = {};
  currentTheme: string = '';

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getBlog();
    this.getCurrentTheme();
  }
  getBlog() {
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }
  getCurrentTheme(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
}
