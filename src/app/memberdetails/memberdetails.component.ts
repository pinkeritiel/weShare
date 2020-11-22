import { Component,Input } from '@angular/core';
import { Member } from '../member.interface';

@Component({
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent {
  @Input() member: Member[];
  constructor() { }

  

}
