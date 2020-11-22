import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { ShareService } from './share.service';
import { Router } from '@angular/router';
import { Share } from './share.interface';

@Injectable()
export class AuthguardGuard implements CanActivate {

	constructor(private user: AuthenticationService, private sharesService: ShareService, private router: Router){}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean> {

		return new Promise((resolve)=>{
			this.sharesService.showShare(next.params.id)
			.then((res) => {
				var share = res as Share;
				if (share != null){
					if (share.OwnerId == state.root.firstChild.params.id ){
						resolve(true);
					} else {
						alert('User not Authorized for this action!');
						resolve(false);
					}
				} 
			}, (err) => {
				console.log(err);
				resolve(false);
			});
		});
	}
}
 // 	if (this.user.getUserLoggedIn()){
 // 		return true;
 // 	} else {
 // 	this.router.navigate(['/']);
 // 	console.log('You are not authenticated');
//    return this.user.getUserLoggedIn();
//	}

