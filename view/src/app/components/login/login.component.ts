import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { RouteService } from 'src/app/services/route.service';
import { DBResult } from '../../../../../Common/models/DBResult';
import { Login } from '../../../../../Common/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hidePassword: boolean = false;
  errMessage: string = '';
  timeoutErr: any = null;

  form: FormGroup | null = null;

  constructor(
    private routeService: RouteService
    , private route: Router
    , private general: GeneralService
    , private cdRef: ChangeDetectorRef
    , public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  ngOnDestroy(): void {
    
  }

  loadForm() {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onVisiblePassword(event: any) {
    if (event.detail > 0) {
      this.hidePassword = !this.hidePassword
    }
  }

  onLogin() {
    const username = this.form?.get('username')?.value;
    const password = this.form?.get('password')?.value;
    if (username && password) {
      this.routeService.login(new Login(username, password)).subscribe((resultDb: DBResult) => {
        if (resultDb.validated) {
          this.general.user = resultDb.data[0];
          this.general.setCookie('LOGIN_USER', resultDb.data[0].username);
          // this.route.navigateByUrl(`home`);
          // this.cdRef.detectChanges();
        }
      }, (err: any) => this.setMessageErr(err.error.message || err.message))
    } else {
      this.setMessageErr('Insira usuário e senha para continuar');
    }
  }

  setMessageErr(text: string) {
    if (this.timeoutErr) {
      clearTimeout(this.timeoutErr);
      this.timeoutErr = null;
    }
    this.errMessage = text;
    this.timeoutErr = setTimeout(() => this.errMessage = '', 5000);
  }

  onRegister() {

  }
}