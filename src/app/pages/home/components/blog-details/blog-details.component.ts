import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  data: any = {};
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getBlog();
  }
  getBlog() {
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }
}
