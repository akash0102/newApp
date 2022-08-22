import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';

import { Comment } from '../shared/comment';

import { DishService } from '../services/dish.service';

import { ActivatedRoute, Params } from '@angular/router';
//import { Location } from '@angular/common';

import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { visibility,flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  
  dish!: Dish;

  dishIds!: string[];
  prev!: string;
  next!: string;

  visibility = 'shown';

  dishCommentForm!: FormGroup;
  dishComment!: Comment;

  disherrMess!: string;

  dishcopy!: Dish;

  formErrors:{[key:string]:any} = {
    'author': '',
    'comment': ''
  };

  validationcomments:{[key:string]:{[key:string]:string}} = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'comment is required.'
    }
  };

  @ViewChild('cform') dishCommentFormDirective: any;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute ,
    private fb: FormBuilder,
    @Inject('BaseURL') public baseURL:any
    //private location: Location
    ) { 
      this.createForm();
    }

  ngOnInit(): void {
    // const id = +this.route.snapshot.params['id'];
    // this.dishservice.getDish(id.toString()).subscribe((dish)=> this.dish = dish);

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id'])}))
    .subscribe({next:dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; }, 
                error:errmess => this.disherrMess = <any>errmess});
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm() {
    this.dishCommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating : [5,Validators.required],
      comment: ''
    });

    this.dishCommentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation comments now
  }

  onValueChanged(data?: any) {
    //console.log(data);
    if (!this.dishCommentForm) { return; }
    const form = this.dishCommentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error comment (if any)
        this.formErrors[field]='';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const comments = this.validationcomments[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += comments[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.dishComment = this.dishCommentForm.value;
    this.dishComment.date=new Date().toISOString();
    this.dishcopy.comments.push(this.dishComment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe({next:dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      error:errmess => { this.dish = new Dish; this.dishcopy = new Dish; this.disherrMess = <any>errmess; }});
    //console.log(this.dishComment);
    this.dishCommentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.dishCommentFormDirective.resetForm({rating:5});
  }


  // goBack(): void {
  //   this.location.back();
  // }

  // @Input()
  // dish!: Dish;


}
