import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ShareService } from '../share.service';
import { Share } from '../share.interface';
const now = new Date();

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css']
})

export class SharesComponent implements OnInit {
 
  shareList: Share[];
  selectedRow: number;
  selectedShare: Share;
  model: Date;

  constructor(private route: ActivatedRoute, private sharesService: ShareService) { }

  ngOnInit() {
    this.getSharesList(this.route.snapshot.params['id']);
    this.model = new Date(); //{year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    console.log('init shares');
  }

  getSharesList(id){
  	this.sharesService.getMemberShares(id).then((res) => {
    console.log('get shares list');
 		this.shareList = res as Share[];
    if (this.shareList.length > 0){
      this.selectedShare = this.shareList[0];
    }

  	}, (err) => {
  		console.log(err);
  	});
  }

  onSelect(row: number):void {
    this.selectedRow = row;
    this.selectedShare = this.shareList[row];
  }
  selectDate():void{
    //console.log(this.model.year + ' ' + this.model.day + ' '  + this.model.month);
  }
}
