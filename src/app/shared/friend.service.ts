import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Friend } from './friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  //FormData
  //formData: Friend;

  constructor(private httpClient: HttpClient) { }

  /*
  getFriends(){
    this.httpClient.get<any>('http://localhost:9090/api/employees').subscribe(
      response => {
        console.log(response);
        this.friends = response;
      }
    );
  }*/

  // GET ALL List
  getAllFriends(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/employees");
  }

  // INSERT
  postEmployee(friend: Friend): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "/api/employees", friend);
  }

  //Update
  putEmployee(friend: Friend): Observable<any> {
    return this.httpClient.put(environment.apiUrl + "/api/employees", friend);
  }

  //DELETE
  deleteEmployee(delId: number): Observable<any> {
    console.log("ID: " + delId);
    return this.httpClient.delete(environment.apiUrl + "/api/employees/" + delId);
  }


}
