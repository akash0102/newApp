import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AESEncDecServiceService } from '../services/aesenc-dec-service.service';
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
  user: User = {
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
    @Inject('BaseURL') public baseURL: any,
    private userService: UserService,
    private authService: AESEncDecServiceService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.getUser(this.user.id, this.authService.encrypt(this.user.password))
      .subscribe({
        next: user => {
          this.user = user;
          this.user.loggedIn = this.user.id + "@" + new Date().toTimeString().substring(0, new Date().toTimeString().indexOf(" "));
          console.log(this.user.loggedIn);
          this.dialogRef.close();
        },
        error: errmess => {
          this.user = new User;
          this.usererrMess = errmess;
        }
      });
    this.loginFormDirective.resetForm()
    //this.dialogRef.close();
  }

  openRegForm() {
    this.dialog.open(RegisterComponent, { width: '500px', height: '450px' });
  }

}