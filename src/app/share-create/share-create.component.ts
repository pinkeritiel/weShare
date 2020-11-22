import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';
import { AuthenticationService } from '../authentication.service';
//import { Share } from '../share.interface';

@Component({
  selector: 'app-share-create',
  templateUrl: './share-create.component.html',
  styleUrls: ['./share-create.component.css']
})
export class ShareCreateComponent implements OnInit {

  share: any = {};

  constructor(private shareService: ShareService, private router: Router, private user: AuthenticationService) { }

  ngOnInit() {
  }

  saveShare() {
    console.log('share-create');
    this.shareService.saveShare(this.share).then((result) => {
      let id = result['_id'];
      var currentId =  this.user.getCurrentId(); 
      var currentUser =  this.user.getCurrentUser(); 
      var currentEmail = this.user.getCurrentEmail();
      console.log('current email is ' + currentEmail);
      this.shareService.addMember(id,currentId,currentUser, currentEmail).then((result) => {
        this.router.navigate(['/dashboard']);
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }
}