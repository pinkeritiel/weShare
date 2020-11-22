import { Injectable } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MemberSelectComponent } from './member-select/member-select.component';
import { ShareService } from './share.service';
import { MessageService } from './message.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class ModalhelperService {
  name:string;
  bsModalRef: BsModalRef;
  public subscriptions: Subscription[] = [];
  public messages: string[] = [];
  public newOwner: Subject<any> = new Subject<any>();
  private share: any;
  //see http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
  constructor(private modalService: BsModalService, private shareService: ShareService, private messageService: MessageService) {
  }

  showConfirm(share: any) {
    this.subscribe();
    this.bsModalRef = this.modalService.show(MemberSelectComponent);
    this.bsModalRef.content.title = 'Replace current owner - ' + share.OwnerName ;
    console.log('showconfirm');
    this.share = share;
    this.bsModalRef.content.selectedShare = share;
  }

  public subscribe(){
    this.messages = [];
    /*
    this.subscriptions.push(this.modalService.onShow.subscribe(($event: any, reason: string) => {
      this.messages.push(`onShow event has been fired`);
    }));
    this.subscriptions.push(this.modalService.onShown.subscribe((reason: string) => {
      this.messages.push(`onShown event has been fired`);
    }));
    */
    this.subscriptions.push(this.modalService.onHide.subscribe((reason: string) => {
      this.messages.push(`onHide event has been fired${reason ? ', dismissed by ' + reason : ''}`);
      if(confirm("Are you sure to replace?")) {
        console.log("Implement delete functionality here");
        this.newOwner.next(this.bsModalRef.content.selectedMember);
        this.share.OwnerName = this.bsModalRef.content.selectedMember.MemberName;
        this.share.OwnerId = this.bsModalRef.content.selectedMember.Member;
        this.shareService.updateShares(this.share._id, this.share).then((result) => {
          this.messageService.sendMessage({'email':this.bsModalRef.content.selectedMember.email,'share':this.share.shareId,'sharename':this.share.ShareName,'messagetype':'NotifyOwnerChange'}).then((result) => {
           }, (err) => {
        console.log(err);
        });
          }, (err) => {
            console.log(err);
        });
      };
      this.unsubscribe();
    }));
  /*
    this.subscriptions.push(this.modalService.onHidden.subscribe((reason: string) => {
      this.messages.push(`onHidden event has been fired${reason ? ', dismissed by ' + reason : ''}`);
      this.unsubscribe();
    }));
    */
  }

  public unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}