import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginFormDirective: any;

  //user = {username: '', password: '', remember: false};
  user: User={
    id: '', 
    password: '',
    firstname: '',
    lastname: '',
    email: false,
    telnum: '',
    loggedIn: false
  };

  usererrMess!: string;
  loginform: any;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, 
    public dialog: MatDialog,
    @Inject('BaseURL') public baseURL:any,
    private userService: UserService ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.getUser(this.user.id, this.user.password).subscribe({next:() => {
      this.user.loggedIn=this.user.id; this.dialogRef.close();},
    error:errmess => { this.user = new User; this.usererrMess = errmess;}});
    this.loginFormDirective.resetForm()
    //this.dialogRef.close();
  }

  openRegForm() {
    this.dialog.open(RegisterComponent, {width: '500px', height: '450px'});
  }
  
}