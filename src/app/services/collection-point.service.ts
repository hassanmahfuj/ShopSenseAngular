import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionPoint } from '../interfaces/collection-point';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class CollectionPointService {

  private baseUrl: string = 'http://localhost:8080/collectionpoint';

  constructor(private http: HttpClient) { }

  create(cp: CollectionPoint): Observable<CollectionPoint> {
    return this.http.post<CollectionPoint>(this.baseUrl, cp);
  }

  readAll(): Observable<CollectionPoint[]> {
    return this.http.get<CollectionPoint[]>(this.baseUrl);
  }

  readByDistrict(district: string): Observable<CollectionPoint[]> {
    return this.http.get<CollectionPoint[]>(this.baseUrl.concat('/search'), {
      params: { district }
    });
  }

  update(cp: CollectionPoint): Observable<CollectionPoint> {
    return this.http.put<CollectionPoint>(this.baseUrl, cp);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl, {
      params: { id }
    });
  }
}
