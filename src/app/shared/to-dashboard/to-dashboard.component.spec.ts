import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDashboardComponent } from './to-dashboard.component';

describe('ToDashboardComponent', () => {
  let component: ToDashboardComponent;
  let fixture: ComponentFixture<ToDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
