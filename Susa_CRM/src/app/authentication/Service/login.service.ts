import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

private baseUrl= 'https://susa-crmpublic-render-deploy-3.onrender.com/Api/SuperAdmin/login'

  constructor(private http: HttpClient) { }

  loginAsSuperAdmin(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
