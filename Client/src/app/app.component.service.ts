import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from './shared/models/info.model';

@Injectable()
export class AppService {

    protocole = 'http://'
    domain = 'coronavirus-survey.gotocme.com'
    constructor(private http: HttpClient) {
    }

    sendReference(hash?: string, key?: string): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' }) as any;
        let endPoint = hash ? `/info/${hash}` : '/info';
        return this.http.post(`${this.protocole}/${this.domain}/${endPoint}`, key ?? { key: key }, { headers: headers, observe: 'response' });
    }

    save(survey: Survey): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' }) as any;
        return this.http.post(`${this.protocole}/${this.domain}/save`, survey, { headers: headers, observe: 'response' });
    }

}
