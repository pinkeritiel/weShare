import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 isUserLoggedIn: boolean;
 currentId =  null;
 currentUser =  '- not yet logged in.';

 constructor(private user: AuthenticationService, private location: Location) {
 	this.user.IsUserLoggedIn.subscribe(value => {
	this.isUserLoggedIn = value;
 	this.currentId =  this.user.getCurrentId(); 
 	this.currentUser =  this.user.getCurrentUser(); 
 	});
  }

  ngOnInit() {
  	this.user.removeCurrentUser();
  }
  goBack(): void {
    this.location.back();
  }
}
