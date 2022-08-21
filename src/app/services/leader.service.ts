import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeader(id: string):Observable<Leader>{
    return of(LEADERS.filter((leader)=>leader.id=id)[0]).pipe(delay(2300));
  }

  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2300));
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader)=>leader.featured)[0]).pipe(delay(2300));
  }
  
}
