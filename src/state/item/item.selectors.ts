import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { ItemState } from './item.reducer';
import { combineLatest } from 'rxjs';

const selectItemsState = createFeatureSelector<ItemState>('items');

export const selectItems = createSelector(
  selectItemsState,
  (state: ItemState) => state.items
);


export const selectItemState = (state: AppState) => state.items;

