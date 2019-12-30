import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxTimetableUserComponent } from './dialog-box-timetable-user.component';

describe('DialogBoxTimetableComponent', () => {
  let component: DialogBoxTimetableUserComponent;
  let fixture: ComponentFixture<DialogBoxTimetableUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxTimetableUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxTimetableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
