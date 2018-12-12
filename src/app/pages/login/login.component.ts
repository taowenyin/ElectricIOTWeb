import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginError: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginName: ['', [Validators.required]],
      loginPassword: ['', [Validators.required]],
      remember: [false]
    });

    this.loginError = false;
  }

  public onLoginSubmit(): void {

    this.authService.login(this.loginForm.get('loginName').value,
      this.loginForm.get('loginPassword').value).subscribe(
      data => {
        // 登录成功就进行跳转
        if (data.code === 0) {
          this.router.navigateByUrl('/main/map');
        } else {
          this.loginError = true;
          console.log(data);
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Login Complete');
      }
    );
  }

}
