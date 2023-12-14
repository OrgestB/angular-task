import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChartComponent } from './delete-chart.component';

describe('DeleteChartComponent', () => {
  let component: DeleteChartComponent;
  let fixture: ComponentFixture<DeleteChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
