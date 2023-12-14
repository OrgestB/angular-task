import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addItem,
  removeItem,
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
  editItem,
} from './item.actions';
import { ItemService } from '../../app/item.service';
import { of, from, Observable } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectItems } from './item.selectors';
import { AppState } from '../state';
import { Router } from '@angular/router';

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private itemService: ItemService,
    private router: Router
  ) {}

  // Run this code when a loaditems action is dispatched
  loadItems$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadItems),
      switchMap(() =>
        // Call the getitems method, convert it to an observable
        from(this.itemService.getItemsFromApi()).pipe(
          // Take the returned value and return a new success action containing the items
          map((data) => loadItemsSuccess({ items: data })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );

  // Run this code when the additem or removeitem action is dispatched
  saveItems$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addItem, removeItem),
    withLatestFrom(this.store.select(selectItems)),
    switchMap(([action, items]) => {
      let saveObservable: Observable<any> = of(null);

      if (action.type === addItem.type) {
        saveObservable = this.itemService.addItem(action.content);
      } else if (action.type === removeItem.type) {
        const itemId = action.id;
        saveObservable = this.itemService.removeItem(itemId);
      }

      return saveObservable.pipe(
        map(() => loadItems()),
        catchError((error) => of(loadItemsFailure({ error })))
      );
    })
  )
);

  editItem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(editItem),
    switchMap(({updatedItem }) =>
      this.itemService.editItem(updatedItem).pipe(
        tap(() => {
          // Navigate to the 'viewMode' route after items are loaded
          this.router.navigate(['/settings']);
        }),
        map(() => loadItems()), // Reload items after editing
        catchError(error => of(loadItemsFailure({ error })))
      )
    )
  )
);
}