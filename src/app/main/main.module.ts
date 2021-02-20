import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NzAvatarModule,
  NzBreadCrumbModule,
  NzCardModule,
  NzDividerModule,
  NzDropDownModule,
  NzFormModule,
  NzLayoutModule,
  NzMenuModule,
  NzPageHeaderModule,
  NzStatisticModule,
} from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzAvatarModule,
    NzDropDownModule,
    NzPageHeaderModule,
    NzStatisticModule,
    NzCardModule,
    NzFormModule,
    NzDividerModule,
    NzMenuModule
  ]
})
export class MainModule {
}
