import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addItem, editItem } from 'src/state/item/item.actions';
import { Item } from '../item-model';

@Component({
  selector: 'app-edit-chart',
  templateUrl: './edit-chart.component.html',
  styleUrls: ['./edit-chart.component.scss']
})
export class EditChartComponent {

  @Input() chartItem!: Item;

  dataForm!: FormGroup;


  constructor(private fb: FormBuilder,
            private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.dataForm = this.fb.group({
      id: [],
      name: [],
      color: [],
      type: [],
      datesValues: this.fb.array([]),
    });

    

    this.chartItem.datesValues.forEach(({ date, value }) => {
      this.addDateValue(date, value);
    });

    this.dataForm.patchValue(this.chartItem);
  }

  get datesValues(): FormArray {
    return this.dataForm.get('datesValues') as FormArray;
  }

  getDateControl(index: number): FormControl {
    return this.datesValues.at(index).get('date') as FormControl;
  }

  getValueControl(index: number): FormControl {
    return this.datesValues.at(index).get('value') as FormControl;
  }

  addDateValue(date: string = '', value: number = 0): void {
    this.datesValues.push(
      this.fb.group({
        date: [date],
        value: [value],
      })
    );
  }

  removeDateValue(index: number): void {
    this.datesValues.removeAt(index);
  }

  onSubmit(formValues: Item) {
    console.log(formValues)
    this.store.dispatch(editItem({ updatedItem: formValues}));
  }

}
