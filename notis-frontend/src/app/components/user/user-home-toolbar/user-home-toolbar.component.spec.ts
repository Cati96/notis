import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeToolbarComponent } from './user-home-toolbar.component';

describe('MainPageToolbarComponent', () => {
  let component: UserHomeToolbarComponent;
  let fixture: ComponentFixture<UserHomeToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHomeToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
