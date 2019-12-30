import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxAddressUserComponent } from './dialog-box-address-user.component';

describe('DialogBoxAddressComponent', () => {
  let component: DialogBoxAddressUserComponent;
  let fixture: ComponentFixture<DialogBoxAddressUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxAddressUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxAddressUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
