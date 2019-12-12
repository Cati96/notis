import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxNotaryTranslatorComponent } from './dialog-box-notary-translator.component';

describe('DialogBoxComponent', () => {
  let component: DialogBoxNotaryTranslatorComponent;
  let fixture: ComponentFixture<DialogBoxNotaryTranslatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxNotaryTranslatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxNotaryTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
