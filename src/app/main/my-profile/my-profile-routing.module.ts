import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile.component';
import { MyProfileResolver } from './resolvers/my-profile-resolver.service';

const routes: Routes = [
  {
    path: "",
    component: MyProfileComponent,
    resolve: {
      user: MyProfileResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MyProfileRoutingModule { }
