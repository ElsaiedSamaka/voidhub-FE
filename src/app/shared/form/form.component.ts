import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() fields: any[] = [];
  @Output() submitted = new EventEmitter<any>();
  @Output() formStatus = new EventEmitter<any>();
  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: any = {};
    this.fields.forEach((field) => {
      group[field.name] = [
        field.value || '',
        Validators.compose(field.validators || []),
      ];
    });
    this.form = this.fb.group(group);
    this.emitFormStatus();
  }
  submitForm() {
    if (this.form.valid) this.submitted.emit(this.form.value);
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
}
