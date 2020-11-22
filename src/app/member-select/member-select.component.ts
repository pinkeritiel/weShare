import { Component, Input } from '@angular/core';
//import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { Share } from '../share.interface';
import { ListOfMembers } from '../share.interface';


@Component({
	selector: 'modal-content',
	templateUrl:'./member-select.component.html'

})

export class MemberSelectComponent {
	public title: string = 'List of members';
	public selectedShare: Share;
	public selectedMember: ListOfMembers;
	public memberList: ListOfMembers[];


	constructor(public bsModalRef: BsModalRef) {
		console.log('modal');
	}
	onSelect(row: ListOfMembers):void {
		this.selectedMember = row;
		this.title = 'Replace current owner - ' + this.selectedShare.OwnerName + ' with ' + this.selectedMember.MemberName;
	}
	
	isSelected(member:ListOfMembers): boolean {
		if(!this.selectedMember) {
			return false;
		}
		return this.selectedMember.Member ===  member.Member ? true : false;
	}  

	public clickOk() {
		console.log("Click ok...");
	}
}