import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from './../authentication.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	currentId =  null;
	currentUser =  null;
	model: any = {};
	genders = ['Male','Female'];
	updatedSuccessfully = false;
	constructor(private user: AuthenticationService) {

	}

	ngOnInit() {
		console.log('profile');
		this.currentId =  this.user.getCurrentId(); 
		this.currentUser =  this.user.getCurrentUser(); 
		this.user.findUserById(this.currentId)
		.then(
			data => {
				this.model = data;			            
			},
			error => {
				//this.alertService.error(error);
			});
	}

	onSubmit(){

		this.user.updateUser(this.currentId, this.model).then((result) => {
			this.updatedSuccessfully = true;
		}   ,
		error => {
			//this.alertService.error(error);
			this.updatedSuccessfully = false;
		}); 
	}

	doesNotUpdate(){
		return !this.updatedSuccessfully;
	}

}
