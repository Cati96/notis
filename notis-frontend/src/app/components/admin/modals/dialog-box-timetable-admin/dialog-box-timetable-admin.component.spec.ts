import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxTimetableAdminComponent } from './dialog-box-timetable-admin.component';

describe('DialogBoxTimetableComponent', () => {
  let component: DialogBoxTimetableAdminComponent;
  let fixture: ComponentFixture<DialogBoxTimetableAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxTimetableAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxTimetableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
