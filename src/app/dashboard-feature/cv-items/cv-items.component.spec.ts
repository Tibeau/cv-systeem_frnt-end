import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvItemsComponent } from './cv-items.component';

describe('CvItemsComponent', () => {
  let component: CvItemsComponent;
  let fixture: ComponentFixture<CvItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
