import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  regUser!: User;

  formErrors: { [key: string]: string } = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
    'password':''
  };

  validationMessages: { [key: string]: { [key: string]: string } } = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
    'password':{
      'required': 'Password is required',
      'pattern': 'Password must contain atleast 6 length, 1 Capital letter and a number'
    }
  };


  regerrMess!: string;

  constructor(public dialogRef: MatDialogRef<RegisterComponent>, public dialog: MatDialog,
    @Inject('BaseURL') public baseURL:any, private fb: FormBuilder,
    private userService: UserService ) { 
      this.createForm();
    }

  ngOnInit(): void {
  }

  createForm() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern]]
    });

    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    //console.log(data);
    if (!this.registerForm) { return; }
    const form = this.registerForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.regUser=this.registerForm.value;
    this.regUser.loggedIn=false; 
    this.regUser.id=this.regUser.firstname.substring(1,3)+this.regUser.telnum.substring(3,7)+this.regUser.lastname.substring(1,3)
    this.userService.createUser(this.regUser)
      .subscribe({
        next: regUser => { this.regUser = regUser; },
        error: errmsg => { this.regUser = new User(); this.regerrMess = <any>errmsg; }
      });
    setTimeout(() => {
      this.regerrMess = '';
      this.regUser = new User();
    }, 5000);
    this.registerForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      password: ''
    });

    this.dialogRef.close();

  }


}
