import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Location } from './location';

@Injectable()
export class LocationService {
    private locationsUrl = 'api/locations'; //URL to "web api"
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getLocations(): Promise<Location[]> {
        console.log('getting all locations...');
        return this.http.get(this.locationsUrl)
                  .toPromise()
                  .then(response => response.json().data as Location[])
                  .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}