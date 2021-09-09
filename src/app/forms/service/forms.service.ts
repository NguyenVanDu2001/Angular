import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { formCovert, formInput } from '../service/form';
@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private https: HttpClient) { };
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
    return { heroes };
  }
  private REST_API_SERVER = "https://localhost:44308/api/ConvertApi";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public getApi(): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.https.get(this.REST_API_SERVER, this.httpOptions).subscribe((res: any) => {
        console.log(res);
        resolve(res);
      }, rejects);
    })
  }

  public getConvertToServer(formInp: formInput): Observable<formCovert> {
      return this.https.get<formCovert>(`${this.REST_API_SERVER}/ConvertTypeIntoResult/?input=${formInp.input}&ConvertTo=${formInp.ConvertTo}&ConvertInto=${formInp.ConvertInto}`, this.httpOptions)
        .pipe(
          tap(Student => console.log(`Student fetched! + ${Student}`)),
          catchError(this.handleError<formCovert>('Get student'))
        );
  }
  public postImgToServerCovert(formInp: formInput,file :any) : Observable<formCovert>{
    var formdata = new FormData();
    formdata.append("img",file);
    return this.https.post<formCovert>(`${this.REST_API_SERVER}/ConvertTypeIntoFile?ConvertTo=${formInp.ConvertTo}&ConvertInto=${formInp.ConvertInto}`,formdata)
    .pipe(
      tap(Student => console.log(`Student fetched! + ${Student}`)),
      catchError(this.handleError<formCovert>('Get student'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}