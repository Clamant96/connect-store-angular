import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Console } from '../models/console';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  public API = `${environment.server}${environment.porta}`;

  constructor(
    private http: HttpClient

  ) { }

  public AUTORIZACAO = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  findAllConsoles(): Observable<Console[]> {

    return this.http.get<Console[]>(`${this.API}/console/`, this.AUTORIZACAO)
  }

}
