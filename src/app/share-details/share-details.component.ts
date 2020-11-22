import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ShareService } from '../share.service';
import { AuthenticationService } from '../authentication.service';
import { Share } from '../share.interface';

@Component({
  selector: 'app-share-details',
  templateUrl: './share-details.component.html',
  styleUrls: ['./share-details.component.css']
})
export class ShareDetailsComponent implements OnInit {

  selectedShare: Share;
  successMessage: string;
  
  constructor(private route: ActivatedRoute, private router: Router, private shareService: ShareService, private user: AuthenticationService) { }

  ngOnInit() {
    this.getShareDetail(this.route.snapshot.params['id']);
  }

  getShareDetail(id) {
    this.shareService.showShare(id).then((res) => {
      this.selectedShare = res as Share;
    }, (err) => {
      console.log(err);
    });
  }

  addMember(id) {
    var currentId =  this.user.getCurrentId(); 
    var currentUser =  this.user.getCurrentUser(); 
    var currentEmail = this.user.getCurrentEmail();
    console.log('current email is ' + currentEmail);
    this.shareService.addMember(id,currentId,currentUser, currentEmail).then((result) => {
      if (result==false){
        this.successMessage = "Member already exists.";
      } else {
        this.successMessage = "Member saved";
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteShare(id) {
    this.shareService.deleteShare(id).then((result) => {

    }, (err) => {
      console.log(err);
    });
  }
}