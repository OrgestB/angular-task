import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectItems } from 'src/state/item/item.selectors';
import { Item } from '../item-model';
import { loadItems } from 'src/state/item/item.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  allCharts$: Observable<Item[]>
  chartData: any;

  constructor(private store: Store,
    public dialog: MatDialog) {
    this.allCharts$ = this.store.select(selectItems); 
  }

  ngOnInit() {
    this.chartData = [];
    this.store.dispatch(loadItems());
  }

  edit(chartItem: Item) {
    this.openDialog("edit", chartItem);

  }

  delete(chartItem: Item) {
    this.openDialog("delete", chartItem);
  }
  
  addItem() {
    this.openDialog("add");
  }


  openDialog(action: string, chartItem?: Item, ): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: "900px",
      data: {item: chartItem, action: action},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  



}
