import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userModelObj: any = {};
  
  formValue!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.formValue = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createAccount() {
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.password = this.formValue.value.password;

    this.authService.signUp(this.userModelObj)
      .subscribe(response => {
        alert("User successfully created account");
      }, error => {
        alert(error.message);
      });
  }

}
