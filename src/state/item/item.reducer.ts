import { Item } from "src/app/item-model";
import { createReducer, on } from "@ngrx/store";
import { addItem, removeItem, loadItems, loadItemsSuccess, loadItemsFailure, editItem} from "./item.actions";




export interface ItemState {
    items: Item[];
    filters: { [chartId: number]: { startDate: string | null; endDate: String | null } };
    error: string|null;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ItemState = {
    items: [],
    filters: {},
    error: null,
    status: 'pending',
  };

  export const itemReducer = createReducer(
    // Supply the initial state
    initialState,
    // Add the new item to the items array
    on(addItem, (state, { content }) => ({
      ...state,
      item: { id: content.id, name: content.name, color: content.color, type: content.type, datesValues: content.datesValues },
    })),
    // Remove the item from the items array
    on(removeItem, (state, { id }) => ({
      ...state,
      items : state.items.filter((item) => item.id !== id),
    })),
    on(editItem, (state, { updatedItem }) => ({
      ...state,
      items: state.items.map(item => (item.id === updatedItem.id ? updatedItem : item)),
    })),
    // Trigger loading the items
    on(loadItems, (state) => ({ ...state, status : "loading" as const })),
    // Handle successfully loaded items
    on(loadItemsSuccess, (state, { items }) => ({
      ...state,
      items: items,
      error: null,
      status: "success" as const,
    })),
    // Handle items load failure
    on(loadItemsFailure, (state, { error }) => ({
      ...state,
      error: error,
      status: "error" as const,
    }))
  );