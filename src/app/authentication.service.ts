import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    public token: string;
    public IsUserLoggedIn: Subject<boolean> = new Subject<boolean>();

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    
    login(data) {
        return this.http.post('/api/auth/login', data)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let token = response.json() && response.json().token;
            let userid = response.json().userid;
            let email = response.json().email;
            if (token) {
                // set token property
                this.token = token;
                console.log('email ' + data.email);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: data.username, userid: userid, email: email,  token: token }));
                console.log('Stored currentUser and token: ' + data.username + '-' + token  );
                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        });
    }

    findUser(email:string) {
        console.log('in findUser for ' + email);
        var _emailToget = email;
        return new Promise((resolve, reject) => {
            this.http.get("/api/auth/byemail",{ params : { email : _emailToget}})
            .map(result => result.json())
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            })
        });
    }


    findUserById(id:string) {
        console.log('in findUser for ' + id);
        var _idToget = id;
        return this.http.get("/api/auth/byuserid",{ params : { id : _idToget}})
        .map(result => result.json())
        .toPromise();
    }

    register(data) {
        //console.log('posting Member ' + JSON.stringify(member));

        return this.http.post("/api/auth/register",data)
        .map(result => result.json() );
        //  .catch(this.handleErrorPromise);
    };

    logout() {
        // remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    updateUser(id, data) {
        console.log('update user');
        return new Promise((resolve, reject) => {
            this.http.put('/api/auth/updateuser/'+id, data)
            .map(res => res.json())
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
        });
    }

    getCurrentUser(){
        var curUser = JSON.parse(localStorage.getItem('currentUser'));
        return curUser.username;
    }    
    getCurrentId(){
        var curUser = JSON.parse(localStorage.getItem('currentUser'));
        return curUser.userid;
    }
    getCurrentEmail(){
        var curUser = JSON.parse(localStorage.getItem('currentUser'));
        return curUser.email;
    }        
    removeCurrentUser(){
        localStorage.removeItem('currentUser');
    }
}