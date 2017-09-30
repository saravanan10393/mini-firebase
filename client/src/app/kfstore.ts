import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import {default as kfClient} from './kfbase.client';
import { IDataStore } from './IDataStore'

@Injectable()
export class KFStoreService implements IDataStore {
    
    constructor() {}

    init(){
        kfClient.init({
            appId:"59b3beb318796000151fd312",
            url:"localhost:3000"
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

    addTask(task){
        kfClient.ref('tasks').push().set(task);
    }

    updateTask(task){
        kfClient.ref(`tasks/${task.id}`).set(task)
    }

    deleteTask(taskId){
        kfClient.ref(`tasks/${taskId}`).delete();
    }

}