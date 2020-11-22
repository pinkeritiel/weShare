import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ShareService } from '../share.service';
import { AuthenticationService } from '../authentication.service';
import { MessageService } from '../message.service';
import 'rxjs/add/operator/map';
import { Share } from '../share.interface';


@Component({
  selector: 'app-share-member',
  templateUrl: './share-member.component.html',
  styleUrls: ['./share-member.component.css']
})
export class ShareMemberComponent implements OnInit {

constructor(private route: ActivatedRoute, private router: Router, private user: AuthenticationService, private shareService: ShareService, private messageService: MessageService) { }

  model: any = {};
  message = null;
  shareId = null;
  selectedShare: Share;
  

  ngOnInit() {
    this.getShareDetail(this.route.snapshot.params['id']);
  }

  getShareDetail(id) {
    this.shareId = id;
    this.shareService.showShare(id).then((res) => {
      this.selectedShare = res as Share;
    }, (err) => {
      console.log(err);
    });
  }
  onSubmit(){

    return new Promise((resolve, reject) => {
      this.user.findUser(this.model.email)
      .then((data) => {
        if(data!=null){
          this.model = data; 
        }
      })
      .then(() => {
        console.log('addMember');
        this.shareService.addMember(this.shareId, this.model._id, this.model.name, this.model.email).then((result) => {
          if (result){
            this.message = "Member added to share.";
            this.sendMessage("NotifyAdded");
          } else {
            this.message = "Member saved - must register.";
            this.sendMessage("NotifyRegister");
          }
        })})
    })   
  }


  sendMessage(messageType: string) {
    this.messageService.sendMessage({'email':this.model.email,'share':this.shareId,'sharename':this.selectedShare.ShareName,'messagetype':messageType}).then((result) => {
      //   let id = result['_id'];
      //   this.router.navigate(['/share-details', id]);
    }, (err) => {
      console.log(err);
    });
  }


  hasNoMessageToShow():boolean{
    if (this.message == null){
      return true;
    } else {
      return false;
    }
  }


}
