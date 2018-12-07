import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginName: string;
  public loginPassword: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  public login(): void {
    this.authService.login(this.loginName, this.loginPassword).subscribe(
      () => {
        console.log(111);
      }
    );

    // console.log(this.authService.login(this.loginName, this.loginPassword));
    // return this.authService.login();
  }

}
