import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
  getBlog() {
    this.route.data.subscribe((data) => {
      console.log('blog', data);
    });
  }
}
