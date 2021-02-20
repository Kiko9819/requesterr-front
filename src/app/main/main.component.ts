import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthFacade } from '../auth/services/auth.facade';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authFacade: AuthFacade) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authFacade.logout$().pipe(take(1)).subscribe();
    console.log("Will call the facade from here some day")
  }

}
