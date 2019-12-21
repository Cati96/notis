import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxServiceComponent } from './dialog-box-service.component';

describe('DialogBoxServiceComponent', () => {
  let component: DialogBoxServiceComponent;
  let fixture: ComponentFixture<DialogBoxServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
