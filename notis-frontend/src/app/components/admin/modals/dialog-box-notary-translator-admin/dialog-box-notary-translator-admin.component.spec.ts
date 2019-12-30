import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxNotaryTranslatorAdminComponent } from './dialog-box-notary-translator-admin.component';

describe('DialogBoxComponent', () => {
  let component: DialogBoxNotaryTranslatorAdminComponent;
  let fixture: ComponentFixture<DialogBoxNotaryTranslatorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxNotaryTranslatorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxNotaryTranslatorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
