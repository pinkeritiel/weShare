import { Component, OnInit, Input} from '@angular/core';
import * as _ from "lodash";
//npm install --save @types/lodash
import { UsageSchedule } from '../share.interface';
import { Share } from '../share.interface';
import { AuthenticationService } from '../authentication.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-shareschedule',
  templateUrl: './shareschedule.component.html',
  styleUrls: ['./shareschedule.component.css']
})
export class SharescheduleComponent implements OnInit {

 @Input() share: Share;
 @Input() model;
 shareSchedule: UsageSchedule[];
 filterSchedule: UsageSchedule[];
 scheduleDate: Date;
 currentId: string; 
 currentUser: string; 
 currentEmail: string; 

  constructor( private user: AuthenticationService, private messageService: MessageService) { }

  ngOnInit() {
  	console.log('initializing schedule');
    this.currentId =  this.user.getCurrentId(); 
    this.currentUser =  this.user.getCurrentUser(); 
    this.currentEmail = this.user.getCurrentEmail();
 
  }
  ngOnChanges() {
  	console.log('ngOnChanges schedule');
  	var yy,mm,dd, fd, fd1;
  	if (this.share != null){
  		this.shareSchedule = this.share.Usage_Schedule;
  		var value = new Date();
  		if (this.model != null){
  		  yy = this.model.getFullYear();
  		  mm = this.model.getMonth()+1;
  		  dd = this.model.getDate();
  		}else {
  		  yy =value.getFullYear();
  		  mm = value.getMonth()+1;
  		  dd = value.getDate();
  		}
  		fd = new Date(yy + '/' + mm + '/' + dd + ' 00:00:00' );
  		fd1 = new Date(fd);
  		fd1.setDate(fd1.getDate() + 1);
  		this.filterSchedule = this.filterByDate(fd,fd1);
  		this.scheduleDate = new Date();
  	}
 }

  filterByDate(fdate: Date,tomorrow: Date): UsageSchedule[]{
  	var newFilteredeSchedule: UsageSchedule[];
  	
  	newFilteredeSchedule = _.filter(this.shareSchedule, function(o) { 
  		var myDate = new Date(o.DateFrom);
  		return myDate >= fdate && myDate <= tomorrow;
  	});
  	return newFilteredeSchedule;
  }

  mailtable(){
    var oTable = document.getElementsByName('schedtable');
    console.log(oTable["0"].innerHTML);
     this.messageService.sendMessage({'email':this.currentEmail,'share':this.share._id,'sharename':this.share.ShareName,'messagetype':"schedtable",'schedule':oTable["0"].innerHTML,'scheddate':this.scheduleDate}).then((result) => {
      //   let id = result['_id'];
      //   this.router.navigate(['/share-details', id]);
    }, (err) => {
      console.log(err);
    });
  }
}
