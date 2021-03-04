import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,

    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "my-profile",
        loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: "/dashboard"
      }
    ]
  },
  {
		path: '**',
		redirectTo: '/'
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
export class MainRoutingModule {
}
