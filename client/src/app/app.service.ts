import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {default as kfClient} from './kfbase.client';

@Injectable()
export class DataService {
    
    constructor() {
        kfClient.init({
            appId:"598f2a2d7f6cb900704b5368"
        })
    }

    getTasks(){
        return new Observable((observer) => {
            kfClient.ref('tasks').on('value', (data) => {
                console.log('retrived data from event ',data)
                observer.next(data);
            });
        });
    }

}