import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, debounceTime, map } from 'rxjs';
import { loadItems} from 'src/state/item/item.actions';
import { selectItems} from 'src/state/item/item.selectors';

import * as Highcharts from 'highcharts';
import { Item } from '../item-model';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewModeComponent { 
  
  chartData: any;
  all$: Observable<Item[]>;
  Highcharts: typeof Highcharts = Highcharts;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  constructor(private store: Store
    ) { 
      this.all$ = this.store.select(selectItems);
  }


  ngOnInit() {
    this.chartData = [];
    this.store.dispatch(loadItems());
  }


  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement, chart: Item) {
    const startDate = dateRangeStart.value;
    const endDate = dateRangeEnd.value;
    console.log(startDate, endDate)

    if (startDate && endDate) {
    }

    
  }

  getChartOptions(chart : Item) {
    let chartOptions: Highcharts.Options = {};
    if (chart) {
      chartOptions = {
      xAxis: {
        categories: chart.datesValues.map((item:any) => item.date),
      },
      series: [{
        name: chart.name,
        color: chart.color,
        type: 'column',
        data: chart.datesValues.map((item:any) => item.value),
    }]
    }
    }
    
    return chartOptions;

  }


}
