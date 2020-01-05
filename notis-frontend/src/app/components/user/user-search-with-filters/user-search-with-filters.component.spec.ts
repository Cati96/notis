import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchWithFiltersComponent } from './user-search-with-filters.component';

describe('UserSearchWithFiltersComponent', () => {
  let component: UserSearchWithFiltersComponent;
  let fixture: ComponentFixture<UserSearchWithFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchWithFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchWithFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
