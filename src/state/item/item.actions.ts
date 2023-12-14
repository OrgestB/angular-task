import { createAction, props } from "@ngrx/store";
import  { Item } from "src/app/item-model";

export const editItem = createAction(
    '[Item Page] Edit Item',
    props<{updatedItem: Item}>()
  );


export const addItem = createAction(
    '[Item Page] Add Item',
    props<{content: Item}>()
)

export const removeItem = createAction(
    '[Item Page] Remove Item',
    props<{id: number}>()
)

export const loadItems = createAction(
    '[Item Page] Load Items'
)


export const loadItemsSuccess = createAction(
    '[Item API] Item Load Success',
    props<{ items: Item[] }>()
  );
  
  export const loadItemsFailure = createAction(
    '[Item API] Item Load Failure',
    props<{ error: string }>()
  );