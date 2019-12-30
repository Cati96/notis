import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxAddressAdminComponent } from './dialog-box-address-admin.component';

describe('DialogBoxAddressComponent', () => {
  let component: DialogBoxAddressAdminComponent;
  let fixture: ComponentFixture<DialogBoxAddressAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxAddressAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxAddressAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
