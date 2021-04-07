import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationUserLogin } from 'src/app/models/account/application-user-login.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private route: Router,
    private formbuilder: FormBuilder
  )
  {
    if(this.accountService.isLoggedIn())
    {
      this.route.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {

    this.loginForm = this.formbuilder.group({
      username: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      password:[null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]]
    });

  }

  isTouched(field: string){
    return this.loginForm.get(field).touched;
  }

  hasErrors(field:string){
    return this.loginForm.get(field).errors;
  }

  hasError(field:string, error:string){
    return this.loginForm.get(field).hasError(error);
  }

  onSubmit(){
    let applicationUserLogin: ApplicationUserLogin = new ApplicationUserLogin(
      this.loginForm.get("username").value,
      this.loginForm.get("password").value
    );

    this.accountService.login(applicationUserLogin).subscribe(() => {
      this.route.navigate(['/dashboard']);
    });

  }

}
