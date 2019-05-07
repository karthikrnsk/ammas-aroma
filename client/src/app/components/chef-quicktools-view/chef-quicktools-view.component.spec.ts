import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefQuicktoolsViewComponent } from './chef-quicktools-view.component';

describe('ChefQuicktoolsViewComponent', () => {
  let component: ChefQuicktoolsViewComponent;
  let fixture: ComponentFixture<ChefQuicktoolsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefQuicktoolsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefQuicktoolsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
