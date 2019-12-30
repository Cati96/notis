import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotaryComponent } from './admin-notary.component';

describe('AdminNotaryComponent', () => {
  let component: AdminNotaryComponent;
  let fixture: ComponentFixture<AdminNotaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
