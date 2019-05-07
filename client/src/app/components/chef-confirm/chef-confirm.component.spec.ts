import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefConfirmComponent } from './chef-confirm.component';

describe('ChefConfirmComponent', () => {
  let component: ChefConfirmComponent;
  let fixture: ComponentFixture<ChefConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
