import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];
  leadererrMess!: string;

  constructor(private leaderservice: LeaderService,
    @Inject('BaseURL') public baseURL:any) {  }

  ngOnInit(): void {
    this.leaderservice.getLeaders().subscribe({next:leaders => this.leaders = leaders,
      error:errmess => this.leadererrMess = <any>errmess}); 
  }

}
