import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  passwordFieldType: string = 'password';

  @Input() parentGroup!: FormGroup;
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void {

  }


  hideAndShowPassword() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
    } else {
      this.passwordFieldType = 'password';
    }
  }
}
