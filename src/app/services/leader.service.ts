import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeader(id: string):Promise<Leader>{
    return new Promise(resolve=>
      setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.id=id)[0]),2300));
  }

  getLeaders(): Promise<Leader[]>{
    return new Promise(resolve=>
      setTimeout(()=>resolve(LEADERS),2300));
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve=>
      setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.featured)[0]),2300));
  }
  
}
