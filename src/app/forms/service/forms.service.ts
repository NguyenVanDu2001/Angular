import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class FormsService {
   
    constructor(private https:HttpClient){};
    getAll() {
        const heroes = [
          { id: 11, name: 'Dr Nice' },
          { id: 12, name: 'Narco' },
          { id: 13, name: 'Bombasto' },
          { id: 14, name: 'Celeritas' },
          { id: 15, name: 'Magneta' },
          { id: 16, name: 'RubberMan' },
          { id: 17, name: 'Dynama' },
          { id: 18, name: 'Dr IQ' },
          { id: 19, name: 'Magma' },
          { id: 20, name: 'Tornado' }
        ];
        return {heroes};
      }
      private REST_API_SERVER = "http://localhost:44308/api/ConvertApi/ConvertTypeIntoResult";
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      public getApi():Promise<any> {
        return new Promise((resolve,rejects)=>{
          this.https.get(this.REST_API_SERVER , this.httpOptions).subscribe((res :any) => {
            console.log(res);
            resolve(res);
            },rejects);
        })
      }
      public  getStudentList(): Observable<string> {
        return this.https.get<string>(this.REST_API_SERVER,this.httpOptions)
          .pipe(
            tap(Student => console.log(`Student fetched! + ${Student}` )),
            catchError(this.handleError<string>('Get student', ""))
          );
      }
      private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.log(error);
          console.log(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
      }
  }