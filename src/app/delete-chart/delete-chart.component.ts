import { Component, Input } from '@angular/core';
import { Item } from '../item-model';
import { Store } from '@ngrx/store';
import { removeItem } from 'src/state/item/item.actions';

@Component({
  selector: 'app-delete-chart',
  templateUrl: './delete-chart.component.html',
  styleUrls: ['./delete-chart.component.scss']
})
export class DeleteChartComponent {

  constructor(private store: Store) {

  }

  @Input() chartItem! : Item;

  delete() {
    this.store.dispatch(removeItem({id:this.chartItem.id}));

  }

}
