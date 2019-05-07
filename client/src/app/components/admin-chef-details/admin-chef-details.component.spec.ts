import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChefDetailsComponent } from './admin-chef-details.component';

describe('AdminChefDetailsComponent', () => {
  let component: AdminChefDetailsComponent;
  let fixture: ComponentFixture<AdminChefDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChefDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChefDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
