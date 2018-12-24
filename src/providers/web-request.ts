import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WebRequestProvider {

  constructor(private http: HttpClient) {
    console.log('Hello WebRequestProvider Provider');
  }

  request(api, requestData:any = {}, httpHeaders:HttpHeaders = null, method:string = 'post'):Promise<any>{
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    if (httpHeaders) 
      for (const key in httpHeaders)
        if (httpHeaders.hasOwnProperty(key)) headers.set(key, httpHeaders[key])

    let url = `http://localhost:8080/v1/user/${api}`;

    let urlData:any;
    urlData = Object.assign({}, requestData);

    console.log(`WEB REQ - ${api}`);

    // Create a promise for http.post
    return new Promise((resolve, reject)=>{
      let req:Observable<any>;
      if (method == 'get'){
        req = this.http.get(url, {headers: headers, params: urlData})
      } else {
        /* let _params:HttpParams = new HttpParams({fromString: this.serialize(urlData) }); */
        req = this.http.request('post', url, { headers: headers, body: urlData });
      }

      req.subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });

    });
  }

}
