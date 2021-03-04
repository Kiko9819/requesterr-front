import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-profile-form',
  templateUrl: './my-profile-form.component.html',
  styleUrls: ['./my-profile-form.component.scss']
})
export class MyProfileFormComponent implements OnInit {

  @Input() user;

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.user.email)

    this.formGroup = this.formBuilder.group({
      email: [],
      password: []
    })
  }

  submitForm(): void {
    console.log("Submitting form")
  }

}
