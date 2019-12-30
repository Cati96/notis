import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTranslatorComponent } from './admin-translator.component';

describe('AdminTranslatorComponent', () => {
  let component: AdminTranslatorComponent;
  let fixture: ComponentFixture<AdminTranslatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTranslatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTranslatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
