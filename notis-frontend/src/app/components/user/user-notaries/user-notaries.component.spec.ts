import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotariesComponent } from './user-notaries.component';

describe('UserNotariesComponent', () => {
  let component: UserNotariesComponent;
  let fixture: ComponentFixture<UserNotariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNotariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
