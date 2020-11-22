import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { ShareService } from '../../share.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  model: any = {};
  genders = ['Male','Female'];
  emailCheck: any;
  results: any;
  status: any;
  isexists = false;
  registeredSuccessfully = false;
  constructor(private router: Router, private route: ActivatedRoute, private _authenticationService: AuthenticationService, private _shareService:ShareService) { 

  }
  onSubmit(){
    this.results = null; 
    this.isexists = false;
    this._authenticationService.register(this.model)
    .subscribe(res => {
      if (res.success){
        console.log("member does not exist");
        this.registeredSuccessfully = true;
        this.submitted = true;
        this._shareService.registerMember(this.model.email, res.userid)
        .then(res => {
         
        });
        this.router.navigate(['/login']);
      }           
      else {
        this.isexists =true;
        this.registeredSuccessfully = false;
        this.submitted = false;
        this.results = res;
        console.log("user exists: " + this.results.name);
      }
    }   ,
    error => {
      //this.alertService.error(error);
      this.submitted = false;
    }); 
  }

  ngOnInit() {  }

 
  newMember():void{
    //this.model = new us('','', false, '', '','');
  }
  doesNotMemberExist():boolean{
    return !this.isexists;
  }
  doesNotRegistered():boolean{
    return !this.registeredSuccessfully;
  }
  // TODO: Remove this when we're done
  //  get diagnostic() { return JSON.stringify(this.model); }
}
