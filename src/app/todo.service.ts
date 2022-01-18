import { ItemVm } from './view-model/item-vm.vm';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './model/item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private counter = 0;

  private items: Item[] = [];

  private subject$: Subject<Item[]> = new BehaviorSubject([] as Item[]);

  constructor() { }

  createItem(name: string) {
    this.items.push(new Item({
      id: this.counter++,
      name,
      isDone: false
    }));
    this.subject$.next(this.items);
  }

  toggleItem(id: number): void {
    const target = this.items.find(e => e.match(id));
    target?.toggleState();
    this.subject$.next(this.items);
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(e => !e.match(id));
    this.subject$.next(this.items);
  }

  get items$(): Observable<ItemVm[]> {
    return this.subject$.pipe(
      map(items => items.map(e => e.asViewModel()))
    );
  }
}
