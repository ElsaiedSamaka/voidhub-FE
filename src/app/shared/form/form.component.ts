import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() fields: any[] = [];
  @Input() isDisabled: boolean = false;
  @Output() submitted = new EventEmitter<any>();
  @Output() formStatus = new EventEmitter<any>();
  @Output() togglePasswordState = new EventEmitter<boolean>();
  @Input() showPassword: boolean = false;
  @Input() enctype: string = '';

  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log('enctype', this.enctype);
    const group: any = {};
    this.fields.forEach((field) => {
      group[field.name] = [
        field.value,
        Validators.compose(field.validators || []),
      ];
    });
    this.form = this.fb.group(group);
    this.emitFormStatus();
  }

  submitForm() {
    if (this.form.valid) {
      const formData = this.prepareForm();
      this.submitted.emit(formData);
    }
  }
  emitFormStatus() {
    this.form.statusChanges.subscribe({
      next: (status) => {
        this.formStatus.emit(status);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  handleFileChange(file: any) {
    this.form.patchValue({
      file_img: file,
    });
  }
  prepareForm() {
    let formData = new FormData();
    console.log('this.form.value', this.form.value);
    Object.entries(this.form.value).forEach(([key, value]) => {
      if (typeof value === 'string') {
        formData.append(key, value);
        console.log('formData', formData);
      } else if (value instanceof Blob) {
        formData.append(key, value, value['name']);
      }
    });
    return formData;
  }
  togglePassword(): void {
    if (!this.isDisabled) {
      this.togglePasswordState.emit(!this.showPassword);
    }
  }
}
