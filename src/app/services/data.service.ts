import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  searchInput = new BehaviorSubject<string>('');

  fetchImages(body:any): Observable<any> {
    return this.http.post<any>(environment.BaseURL + 'fetchImages.php',body);
  }

  fetchImagesByTags(start:number , size:number,query:string): Observable<any> {
    return this.http.get<any>(environment.BaseURL + 'fetchImagesByTags.php?tags='+ query + '&start=' + start + '&size='+ size);
  }
}

// http://10.10.121.55/imageFusion/api/fetchImagesByTags.php?tags=nature&start=1&size=20