import { Component, OnInit, Input } from '@angular/core';
import { Share } from '../share.interface';

@Component({
  selector: 'app-sharedetail',
  templateUrl: './sharedetail.component.html',
  styleUrls: ['./sharedetail.component.css']
})
export class SharedetailComponent implements OnInit {
  @Input() share: Share[];

  constructor() { }

  ngOnInit() {
  }

}
