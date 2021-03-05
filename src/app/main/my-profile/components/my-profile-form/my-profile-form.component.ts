import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UsersFacade } from 'src/app/main/services/users.facade';
import { UsersState } from 'src/app/main/services/users.state';

@Component({
  selector: 'app-my-profile-form',
  templateUrl: './my-profile-form.component.html',
  styleUrls: ['./my-profile-form.component.scss']
})
export class MyProfileFormComponent implements OnInit {

  @Input() user;

  loading$: Observable<boolean>;

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacade,
    private usersState: UsersState) { 
      this.loading$ = this.usersState.getMyProfileLoading$();
    }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [this.user.name],
      email: [this.user.email, [Validators.email]],
    })
  }

  // maybe create an abstraction that contains this logic and only call the needed api methods after calling super.
  submitForm(): void {
    for (const i in this.formGroup.controls) {
      this.formGroup.controls[i].markAsDirty();
      this.formGroup.controls[i].updateValueAndValidity();
    }

    if (this.formGroup.invalid) {
      return;
    }

    this.usersFacade.update$(this.formGroup.value, this.user.id).pipe(
      take(1)
    ).subscribe();
  }

}
