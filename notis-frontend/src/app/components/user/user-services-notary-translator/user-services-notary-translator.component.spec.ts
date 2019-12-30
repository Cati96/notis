import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserServicesNotaryTranslatorComponent } from './user-services-notary-translator.component';

describe('UserServicesComponent', () => {
  let component: UserServicesNotaryTranslatorComponent;
  let fixture: ComponentFixture<UserServicesNotaryTranslatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserServicesNotaryTranslatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserServicesNotaryTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
