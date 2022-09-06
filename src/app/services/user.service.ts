import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { User } from '../shared/user';
import { ProcessHTTPMsgService } from '../service/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  createUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<User>(baseURL + 'user/', user, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUser(id: string, password: string): Observable<User> {

    /*const httpHeader =new HttpHeaders();
    httpHeader.append('Content-Type', 'application/json');
    httpHeader.append("Authorization", "Basic my-auth-token");*/

    return this.http.get<User>(baseURL + 'user?id=' + id + '&password=' + password).pipe(map(user => {
      if (Object.keys(user).length != 0)
        return user
      else
        throw new Error
    }))          //, {headers:httpHeader})    .pipe(tap(user=>{if(user.password==password){}}))
      .pipe(catchError(this.processHTTPMsgService.handleError));

    // of(LEADERS.filter((leader)=>leader.id=id)[0]).pipe(delay(2300));
  }

}
