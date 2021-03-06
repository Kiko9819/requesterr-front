import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    data: {
      title: "Home"
    },
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: {
          title: "Dashboard"
        }
      },
      {
        path: "my-profile",
        loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule),
        data: {
          title: "My Profile"
        }
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
