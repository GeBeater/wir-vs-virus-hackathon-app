import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BASE_URL} from '../app.tokens';

@Injectable({
    providedIn: 'root'
})
export class HealthService {

    constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl) {
    }

    status(): Observable<string> {
        const url = this.baseUrl + '/actuator/health';

        return this.http.get(url).pipe(map((status: StatusResponse) => {
            return status.status;
        }));
    }
}

interface StatusResponse {
    status: string;
}
