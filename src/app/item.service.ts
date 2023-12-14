import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item-model';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  editItem(updatedItem: Item) {
    return this.httpClient.put<Item>(`http://localhost:3000/data/${updatedItem.id}`, updatedItem);
  }

  constructor(
    private httpClient: HttpClient
  ) { }


  getItemsFromApi() {
    return this.httpClient.get<Item[]>('http://localhost:3000/data');
  }

  addItem(item: Item) {
    return this.httpClient.post<Item[]>("http://localhost:3000/data/", item);
  }

  removeItem(itemId: number) {
    return this.httpClient.delete(`http://localhost:3000/data/${itemId}`);
  }
}
