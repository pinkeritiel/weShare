import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class MessageService {

	constructor(private http: Http) { }
	
	sendMessage(message){
		return new Promise((resolve, reject) => {
			this.http.post('/api/mail/sendmail/', message)
			.map(res => res.json())
			.subscribe(res => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}	

}