import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTranslatorsComponent } from './admin-translators.component';

describe('AdminTranslatorComponent', () => {
  let component: AdminTranslatorsComponent;
  let fixture: ComponentFixture<AdminTranslatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTranslatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTranslatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
