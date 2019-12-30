import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotariesComponent } from './admin-notaries.component';

describe('AdminNotaryComponent', () => {
  let component: AdminNotariesComponent;
  let fixture: ComponentFixture<AdminNotariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
