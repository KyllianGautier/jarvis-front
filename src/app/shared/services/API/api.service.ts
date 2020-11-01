import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { apiPaths } from '../../constants/api-paths';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  // Task requests:

  public getUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(
      apiPaths.API_PATH + apiPaths.TASKS,
      { headers: this.authenticationService.getAuthorizationHeader() }
      );
  }

  public getUserTask(idTask: number): Observable<Task> {
    return this.http.get<Task>(
      apiPaths.API_PATH + apiPaths.TASKS + '/' + idTask,
      { headers: this.authenticationService.getAuthorizationHeader() }
      );
  }

  public createUserTask(task: Task): Observable<Task> {
    return this.http.post<Task>(apiPaths.API_PATH + apiPaths.TASKS, task, { headers: this.authenticationService.getAuthorizationHeader() });
  }

  public deleteUserTask(idTask: number): Observable<void> {
    return this.http.delete<void>(
      apiPaths.API_PATH + apiPaths.TASKS + '/' + idTask,
      { headers: this.authenticationService.getAuthorizationHeader() }
      );
  }
}
