import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageToolbarComponent } from './main-page-toolbar.component';

describe('MainPageToolbarComponent', () => {
  let component: MainPageToolbarComponent;
  let fixture: ComponentFixture<MainPageToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
