import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  featuredLeader!: Leader;

  disherrMess!: string;
  promoerrMess!: string;
  featLeaderrMess!: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, 
    private leaderservice: LeaderService,
    @Inject('BaseURL') public baseURL:any) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish().subscribe({next:(dish)=> this.dish = dish, error:(errmess) => this.disherrMess = <any>errmess});
    this.promotionservice.getFeaturedPromotion().subscribe({next:(promotion)=> this.promotion = promotion, error:(errmess) => this.promoerrMess = <any>errmess});
    this.leaderservice.getFeaturedLeader().subscribe({next:(leader)=> this.featuredLeader = leader, error:(errmess) => this.featLeaderrMess = <any>errmess});
  }


}
