import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxServiceAdminComponent } from './dialog-box-service-admin.component';

describe('DialogBoxServiceComponent', () => {
  let component: DialogBoxServiceAdminComponent;
  let fixture: ComponentFixture<DialogBoxServiceAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxServiceAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxServiceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
