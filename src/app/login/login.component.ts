import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  submit() {
    this.loginService.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(["dog-search"]),
      error: err => console.error(err)
    })
  }
}
