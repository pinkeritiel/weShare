import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ShareService } from '../share.service';
import { BsDatepickerModule, TimepickerModule, AlertModule } from 'ngx-bootstrap';
import { AuthenticationService } from '../authentication.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import { Location } from '@angular/common';

const now = new Date();

@Component({
  selector: 'app-share-schedule',
  templateUrl: './share-schedule.component.html',
  styleUrls: ['./share-schedule.component.css']
})

export class ShareScheduleComponent implements OnInit {
share = {};
model: Date = new Date();
time: Date = new Date();
date: {year: number, month: number};
shareid = null;
hours = 1;
private _success = new Subject<string>();
staticAlertClosed = false;
successMessage: string;

  selectToday() {
   //this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  constructor(private route: ActivatedRoute, private router: Router, private shareService: ShareService, private user: AuthenticationService, private location: Location) { }

  ngOnInit() {
    //this.getShareDetail(this.route.snapshot.params['id']);
    this.shareid = this.route.snapshot.params['id'];
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);
  }
  public changeSuccessMessage() {
    this._success.next(`${new Date()} - Message successfully changed.`);
  }
/*
  getShareDetail(id) {
    this.shareService.showShare(id).then((res) => {
      this.share = res;

      console.log(this.share);
    }, (err) => {
      console.log(err);
    });
  }
  */
checkDateTime(){
  console.log("checkDateTime Date/Time");

  var currentId =  this.user.getCurrentId(); 
  var currentUser =  this.user.getCurrentUser(); 
  var currentEmail = this.user.getCurrentEmail();
  var checkDate  = {year: this.model.getFullYear(), month: this.model.getMonth() + 1, day: this.model.getDate()};
  var checkTime = {hour:this.time.getHours(),minute:this.time.getMinutes()};
  var scheduleData = {UserId:currentId,UserName:currentUser,email:currentEmail,Day:checkDate,Time:checkTime, Hours:this.hours}

  this.shareService.checkSchedule(this.shareid ,scheduleData)
  .then((result) => {
        if (result == 0){
            this.successMessage = "Date/Time is Available";
          } else {
            this.successMessage = "Date/Time is Not Available";
          }
       },
        (err) => {
        this.successMessage = "Error: " + err;
  });
}

selectDateTime(){
	console.log("Selected Date/Time");

  var currentId =  this.user.getCurrentId(); 
  var currentUser =  this.user.getCurrentUser(); 
  var currentEmail = this.user.getCurrentEmail();
  var checkDate  = {year: this.model.getFullYear(), month: this.model.getMonth() + 1, day: this.model.getDate()};
  var checkTime = {hour:this.time.getHours(),minute:this.time.getMinutes()};

  var scheduleData = {UserId:currentId,UserName:currentUser,email:currentEmail,Day:checkDate,Time:checkTime, Hours:this.hours}
  this.shareService.addSchedule(this.shareid,currentEmail ,scheduleData)
  .then((result) => {
      if(result == 1){
        this.successMessage = "Date/Time is Not Available";
      } else {
        this.successMessage = "You have been scheduled.";
        this.location.back();
      }
  }, 
    (err) => {
    console.log(err);
    this.successMessage = err;
  });
}

increment() {
   this.hours++;
}
 
decrement() {
   this.hours--;
}

}
