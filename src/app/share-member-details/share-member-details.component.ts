import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ShareService } from '../share.service';
import { AuthenticationService } from '../authentication.service';
import { MessageService } from '../message.service';
import { Share } from '../share.interface';
import { ListOfMembers } from '../share.interface';
import { Member } from '../member.interface';

@Component({
	selector: 'app-share-member-details',
	templateUrl: './share-member-details.component.html',
	styleUrls: ['./share-member-details.component.css']
})
export class ShareMemberDetailsComponent implements OnInit {

	selectedShare: Share;
	selectedMember: Member;
	successMessage: string;

	constructor(private route: ActivatedRoute, private router: Router, private shareService: ShareService, private user: AuthenticationService, private messageService: MessageService) { }


	ngOnInit() {
		console.log('share member details');
		this.getShareDetail(this.route.snapshot.params['shareid']);
		this.getMemberDetail(this.route.snapshot.params['memberid']);
	}

	getShareDetail(id) {
		this.shareService.showShare(id).then((res) => {
			this.selectedShare = res as Share;
		}, (err) => {
			console.log(err);
		});
	}

	getMemberDetail(id) {
		this.user.findUserById(id).then((res) => {
			this.selectedMember = res as Member;
		}, (err) => {
			console.log(err);
		});
	}

	sendSchedForm() {
		this.sendMessage('SchedForm');
	}

	sendMessage(messageType: string) {
		this.messageService.sendMessage({'email':this.selectedMember.email,'share':this.selectedShare._id,'sharename':this.selectedShare.ShareName,'messagetype':messageType}).then((result) => {
			alert('Schedule form sent.');
			//   let id = result['_id'];
			//   this.router.navigate(['/share-details', id]);
		}, (err) => {
			console.log(err);
		});
	}

}