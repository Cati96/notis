import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxDocumentsAdminComponent } from './dialog-box-documents-admin.component';

describe('DialogBoxDocumentsComponent', () => {
  let component: DialogBoxDocumentsAdminComponent;
  let fixture: ComponentFixture<DialogBoxDocumentsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxDocumentsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxDocumentsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
