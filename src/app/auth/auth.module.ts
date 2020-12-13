import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NzAvatarModule,
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzLayoutModule,
  NzMessageModule,
  NzTypographyModule
} from 'ng-zorro-antd';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    ReactiveFormsModule,
    NzFormModule,
    NzAvatarModule,
    NzCardModule,
    NzLayoutModule,
    NzTypographyModule
  ]
})
export class AuthModule {
}
