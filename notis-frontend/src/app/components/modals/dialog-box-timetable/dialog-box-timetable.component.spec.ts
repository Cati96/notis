import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxTimetableComponent } from './dialog-box-timetable.component';

describe('DialogBoxTimetableComponent', () => {
  let component: DialogBoxTimetableComponent;
  let fixture: ComponentFixture<DialogBoxTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
