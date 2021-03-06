import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { buffer, filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { AuthFacade } from '../auth/services/auth.facade';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  isCollapsed: boolean;

  title: string;

  destroy$ = new Subject<boolean>();

  constructor(
    private authFacade: AuthFacade,
    private route: ActivatedRoute,
    private router: Router) {
      const routeEndEvent$ = this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
      );
  
      this.router.events
        .pipe(
          filter(e => e instanceof ChildActivationEnd && e.snapshot.component === this.route.component),
          buffer(routeEndEvent$),
          map(([ev]) => (ev as ChildActivationEnd).snapshot.firstChild.data),
          takeUntil(this.destroy$)
        )
        .subscribe(childRoute => {
          this.title = childRoute.title;
        });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  logout(): void {
    this.authFacade.logout$().pipe(take(1)).subscribe();
  }

}
