import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginFormComponent implements OnInit {
  results: Array<any>;
  isVerifiedLogin = false;
  model: any = {};
  loading = false;
  returnUrl: string
  isExists = false;

  constructor(private route: ActivatedRoute, private router:Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    console.log('hit');
    this.isExists = true;
  }

  login() {
    this.loading = true;
    // Access the Data Service's getUsers() method we defined
    //this._dataService.getUsers()
    //    .subscribe(res => this.results = res);
    this.authenticationService.login(this.model)
        .subscribe(
          data => {
            this.authenticationService.IsUserLoggedIn.next(true);            
            console.log("successful authentication");
            this.isExists =true;
            this.router.navigate(['/dashboard']);
          },
          error => {
            //this.alertService.error(error);
            this.isExists =false;
            this.loading = false;
          });
    }

 gotoNewMember(): void {
    this.router.navigate(['/newmember']);
  }
 doesUserExist():boolean{
    return this.isExists ;
  }
}
