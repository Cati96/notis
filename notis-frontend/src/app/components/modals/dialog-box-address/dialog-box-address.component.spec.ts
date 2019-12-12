import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxAddressComponent } from './dialog-box-address.component';

describe('DialogBoxAddressComponent', () => {
  let component: DialogBoxAddressComponent;
  let fixture: ComponentFixture<DialogBoxAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
