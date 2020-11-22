import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class ShareService {

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getAllShares()
   {
    console.log('getting all shares');
    return new Promise((resolve, reject) => {
      this.http.get('/api/shares/getall')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
          }, (err) => {
            reject(err);
          });
    });
    }


 getMemberShares(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/api/shares/getMemberShares/'+ id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  showShare(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/api/shares/getsingle/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveShare(data) {
    console.log('save Share token ' + this.authenticationService.token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authenticationService.token);
    //let headers = new Headers(
    //  {'Content-Type': 'application/x-www-form-urlencoded'},
    //  {'Authorization': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });
    console.log('Options: ' + options);
    return new Promise((resolve, reject) => {
        this.http.post('/api/shares/saveshare', JSON.stringify(data), options)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  addMember(id, userId,userName,email) {
    return new Promise((resolve, reject) => {
        this.http.put('/api/shares/addMember/'+id, {UserId:userId,UserName:userName, Email:email})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  addTempMember(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put('/api/shares/addTempMember/'+id, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateShares(id, data) {
    console.log('update shares');
    return new Promise((resolve, reject) => {
        this.http.put('/api/shares/updateshare/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteShare(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/api/shares/deleteshare/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  checkSchedule(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put('/api/shares/getIsSchedAvail/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
  addSchedule(id,email, data) {
    return new Promise((resolve, reject) => {
        this.http.post('/api/shares/schedreq/'+id +'/' + email, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  registerMember(email, userid) {
    console.log('update membership for newly registered member');
    return new Promise((resolve, reject) => {
        this.http.put('/api/shares/registermember/'+ email, {UserId:userid})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
}