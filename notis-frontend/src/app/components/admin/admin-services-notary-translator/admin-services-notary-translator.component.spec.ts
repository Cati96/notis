import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesNotaryTranslatorComponent } from './admin-services-notary-translator.component';

describe('ServicesNotaryTranslatorComponent', () => {
  let component: AdminServicesNotaryTranslatorComponent;
  let fixture: ComponentFixture<AdminServicesNotaryTranslatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminServicesNotaryTranslatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServicesNotaryTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
