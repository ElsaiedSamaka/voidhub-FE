import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { TagsService } from 'src/core/services/tags.service';

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
  constructor(
    private themeService: ThemeService,
    private tagsService: TagsService
  ) {}

  ngOnInit() {
    this.getCurrentTheme();
  }
  handleTagsChange(event: any): void {
    const name = event.target.value;
    this.showTagsDropDown = true;
    this.tagsService
      .getAll(name)
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: (res) => {
          this.tags = res;
        },
        error: (error) => {},
        complete: () => {},
      });
  }
  handleSpacebarTab(event: any): void {
    if (event.code === 'Space' && this.tag.trim().length > 0) {
      this.tagsService.post({ name: this.tag }).subscribe({
        next: (response) => {},
        error: (error) => {
          console.log('error', error);
        },
        complete: () => {
          this.tag = '';
        },
      });
    } else if (event.code === 'Space') {
      // Prevent input of whitespace by preventing the default key behavior
      event.preventDefault();
    }
  }
  handleTagSelect(value: any): void {
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
