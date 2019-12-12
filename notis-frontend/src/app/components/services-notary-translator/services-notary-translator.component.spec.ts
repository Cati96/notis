import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesNotaryTranslatorComponent } from './services-notary-translator.component';

describe('ServicesNotaryTranslatorComponent', () => {
  let component: ServicesNotaryTranslatorComponent;
  let fixture: ComponentFixture<ServicesNotaryTranslatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesNotaryTranslatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesNotaryTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
