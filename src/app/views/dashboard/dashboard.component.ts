import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name = 'anony';
  currentId = null;

  constructor(private route: ActivatedRoute, private router: Router,private user: AuthenticationService) { }

  ngOnInit() {
  	this.name = this.user.getCurrentUser();
    this.currentId =  this.user.getCurrentId(); 
  }

  createShare(){
  	this.router.navigate(['./dashboard/share-create']);
  }
  MyShares(){
    this.router.navigate(['/shares', this.currentId]);
  }
}
