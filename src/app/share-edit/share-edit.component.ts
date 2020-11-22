import { Component, ViewChild, NgModule,ViewContainerRef,OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { ShareService } from '../share.service';
import { AuthenticationService } from '../authentication.service';
import { ModalhelperService } from '../modalhelper.service';
import { Share } from '../share.interface';
import { ListOfMembers } from '../share.interface';
import { Subscription } from 'rxjs/Subscription';
 
@Component({
	selector: 'app-share-edit',
	templateUrl: './share-edit.component.html',
	styleUrls: ['./share-edit.component.css']
})
export class ShareEditComponent implements OnInit {

	selectedShare: Share;
	newOwner: ListOfMembers;

	constructor(private helper: ModalhelperService, private route: ActivatedRoute, private router: Router, private shareService: ShareService, private user: AuthenticationService) { }

	ngOnInit() {
		this.getShareDetail(this.route.snapshot.params['id']);
		this.helper.newOwner.subscribe((value) => {
			this.newOwner = value as ListOfMembers;
			this.selectedShare.OwnerName = this.newOwner.MemberName;
		});
		console.log('ShareEditComponent');
	}

	getShareDetail(id) {
		this.shareService.showShare(id).then((res) => {
			this.selectedShare = res as Share;
		}, (err) => {
			console.log(err);
		});
	}

	showConfirm() {
	    this.helper.showConfirm(this.selectedShare);
	}

    saveShare() {
    	console.log('saveshare');
   // this.shareService.saveShare(this.selectedShare).then((result) => {
    //  let id = result['_id'];
    //  this.router.navigate(['/share-details', id]);
    //}, (err) => {
   //   console.log(err);
  //  });
  }


}