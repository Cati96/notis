import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeToolbarComponent } from './admin-home-toolbar.component';

describe('AdminHomeToolbarComponent', () => {
  let component: AdminHomeToolbarComponent;
  let fixture: ComponentFixture<AdminHomeToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomeToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
