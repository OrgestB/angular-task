import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addItem } from 'src/state/item/item.actions';
import { Item } from '../item-model';

@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrls: ['./add-chart.component.scss']
})
export class AddChartComponent {

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
    this.store.dispatch(addItem({ content: formValues}));
  }


}
