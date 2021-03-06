import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileFormComponent } from './my-profile-form.component';

describe('MyProfileFormComponent', () => {
  let component: MyProfileFormComponent;
  let fixture: ComponentFixture<MyProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
