import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxDocumentsUserComponent } from './dialog-box-documents-user.component';

describe('DialogBoxDocumentsComponent', () => {
  let component: DialogBoxDocumentsUserComponent;
  let fixture: ComponentFixture<DialogBoxDocumentsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxDocumentsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxDocumentsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
