import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { firstValueFrom, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> { //Promise<Dish[]> {

    return of(DISHES).pipe(delay(2000));

        // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES), 2000);
    // });                                                      return as a new Promise object
    //return firstValueFrom(of(DISHES).pipe(delay(2000)));      return promise that is converted from an Obesrvable
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }

}
