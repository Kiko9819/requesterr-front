import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileFormComponent } from './components/my-profile-form/my-profile-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule, NzButtonModule, NzTypographyModule, NzDividerModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [MyProfileComponent, MyProfileFormComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTypographyModule,
    NzDividerModule,
    ReactiveFormsModule,
    MyProfileRoutingModule
  ]
})
export class MyProfileModule { }
