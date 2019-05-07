import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefProfileViewComponent } from './chef-profile-view.component';

describe('ChefProfileViewComponent', () => {
  let component: ChefProfileViewComponent;
  let fixture: ComponentFixture<ChefProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
