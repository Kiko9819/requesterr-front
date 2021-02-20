import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthFacade } from '../services/auth.facade';
import { AuthState } from '../services/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading$: Observable<boolean>;

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private authState: AuthState,
  ) {
    this.loading$ = this.authState.isLoading$();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.formGroup.controls) {
      this.formGroup.controls[i].markAsDirty();
      this.formGroup.controls[i].updateValueAndValidity();
    }

    if (this.formGroup.invalid) {
      return;
    }

    this.authFacade.login$(this.formGroup.value).pipe(
      take(1)
    ).subscribe();
  }
}
