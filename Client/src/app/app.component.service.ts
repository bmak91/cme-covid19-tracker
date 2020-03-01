import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './shared/models/info.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {
    }

    sendReference(hash?: string, key?: string): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' }) as any;
        let endPoint = hash ? `info/${hash}` : 'info';
        return this.http.post(`${environment.baseUrl}/${endPoint}`, key ? { existingKey: key } : null, { headers: headers, observe: 'response' });
    }

    save(survey: Survey): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' }) as any;
        return this.http.post(`${environment.baseUrl}/save`, survey, { headers: headers, observe: 'response' });
    }

}
