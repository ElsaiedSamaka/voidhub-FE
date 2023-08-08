import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() minlength: number = 0;
  @Input() maxlength: number = 50;
  @Input() pattern: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() autocomplete: string = 'on';
  @Input() autofocus: boolean = false;
  @Input() tabindex: number = 0;
  @Input() size: number = 50;
  @Input() title: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() options: any[] = [];

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
  constructor() {}

  ngOnInit() {}
  // prevent nonnumaric inputs of tel type input
  onKeyDown(event: KeyboardEvent): void {
    const charCode = event.which || event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    } else {
      return;
    }
  }
}
