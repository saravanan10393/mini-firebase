import { Injectable } from '@angular/core';
import { IDataStore } from './IDataStore';
import { Observable } from "rxjs/Observable";
declare var firebase;

@Injectable()
export class FirebaseStoreService implements IDataStore{
    private dataStore;
    constructor(){
            // const config = {
            //     apiKey: "AIzaSyDx8GdNZoROSTq9hx1rfMXKhVZqFdsp4Cw",
            //     authDomain: "todomanager-22624.firebaseapp.com",
            //     databaseURL: "https://todomanager-22624.firebaseio.com",
            //     projectId: "todomanager-22624",
            //     storageBucket: "",
            //     messagingSenderId: "46111403077"
            //   };
            // console.log('init app ', firebase.initializeApp)
            //firebase.initializeApp(config);
            //this.dataStore = firebase.database()
    }

    init(){
        const config = {
            apiKey: "AIzaSyDx8GdNZoROSTq9hx1rfMXKhVZqFdsp4Cw",
            authDomain: "todomanager-22624.firebaseapp.com",
            databaseURL: "https://todomanager-22624.firebaseio.com",
            projectId: "todomanager-22624",
            storageBucket: "",
            messagingSenderId: "46111403077"
          };
        console.log('init app ', firebase.initializeApp)
        firebase.initializeApp(config);
        this.dataStore = firebase.database();
    }

    addTask(task) {
       this.dataStore.ref('tasks').push().set(task);
    }

    updateTask(task) {
        this.dataStore.ref(`tasks/${task.id}`).set(task)
    }

    getTasks() {
        return new Observable((observer) => {
            this.dataStore.ref('tasks').on('value', (data) => {
                var result = data.val ? data.val() : data;
                console.log('retrived data from event ',result)
                observer.next(result);
            });
        });
    }

    deleteTask(taskId) {
        this.dataStore.ref(`tasks/${taskId}`).set(null);
    }

}