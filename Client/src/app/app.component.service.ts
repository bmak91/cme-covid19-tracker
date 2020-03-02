import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './shared/models/info.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService {
    defaultHeaders = new Headers({ 'Content-Type': 'application/json' }) as any;

    constructor(private http: HttpClient) {
    }

    sendReference(hash?: string, key?: string): Observable<any> {
        let endPoint = hash ? `info/${hash}` : 'info';
        return this.http.post(`${environment.baseUrl}/${endPoint}`, key ? { existingKey: key } : null, { headers: this.defaultHeaders, observe: 'response', responseType: 'text' });
    }

    save(survey: Survey): Observable<any> {
        return this.http.post(`${environment.baseUrl}/save`, survey, { headers: this.defaultHeaders, observe: 'response' });
    }

    searchCommunity(text: string): Observable<any> {
        return this.http.get(`${environment.baseUrl}/communities?search=${text}`, { headers: this.defaultHeaders, observe: 'response' });
    }

    saveCommunity(obj: any): Observable<any> {
        return this.http.post(`${environment.baseUrl}/communities`, obj, { headers: this.defaultHeaders, observe: 'response' });
    }
}
