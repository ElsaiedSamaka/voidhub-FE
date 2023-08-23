import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.css'],
})
export class TagsInputComponent implements OnInit {
  tag: string = '';
  tagId: any;
  tags: any[] = [];
  showTagsDropDown: boolean = false;
  theme: string = '';
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.getCurrentTheme();
  }
  handleTagsChange(): void {
    console.log('handleTagsChange');
  }
  handleUserSelect(value: any): void {
    console.log('handleUserSelect', value);
    //  const userId = event.target.value;
    //  const isChecked = event.target.checked;
    //  const user = this.users.find((u) => u.id == userId);
    //  const selectedIndex = this.selectedUsers.findIndex((u) => u.id == userId);

    //  if (isChecked) {
    //    if (selectedIndex === -1) {
    //      this.selectedUsers.push(user);
    //    }
    //    this.showDropdown = false;
    //    this.email = '';
    //  } else {
    //    if (selectedIndex !== -1) {
    //      this.selectedUsers.splice(selectedIndex, 1);
    //    }
    //    this.email = '';
    //    this.showDropdown = false;
    //  }
  }
  getCurrentTheme() {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }
}
