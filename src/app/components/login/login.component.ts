import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userModelObj: any = {};
  formValue!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.formValue = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.password = this.formValue.value.password;

    this.authService.signIn(this.userModelObj)
      .subscribe(response => {
        alert("User successfully logged in");
      }, error => {
        alert(error.message);
      });
  }

}
