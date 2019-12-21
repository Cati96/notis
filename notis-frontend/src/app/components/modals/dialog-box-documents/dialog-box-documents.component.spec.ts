import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxDocumentsComponent } from './dialog-box-documents.component';

describe('DialogBoxDocumentsComponent', () => {
  let component: DialogBoxDocumentsComponent;
  let fixture: ComponentFixture<DialogBoxDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
