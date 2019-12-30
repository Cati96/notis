import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTranslatorsComponent } from './user-translators.component';

describe('UserTranslatorsComponent', () => {
  let component: UserTranslatorsComponent;
  let fixture: ComponentFixture<UserTranslatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTranslatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTranslatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
