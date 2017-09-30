import { Component, NgZone, Inject } from '@angular/core';
import {default as kfClient} from './kfbase.client';
import { IDataStore } from './IDataStore';
import * as _ from 'underscore';

declare const firebase;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  taskname = 'app';
  taskList = {}

  constructor(@Inject('IDataStore')private service: IDataStore, private cdr : NgZone){
    //setTimeout(() => {
      this.service.getTasks().subscribe((tasks) => {
        console.log(this.taskList == tasks)
        this.taskList = tasks
      })
    //},2000);
  }

  addTask(name){
    this.service.addTask({
      name, 
      completed:false,
    });
  }

  updateTask(task){
    this.service.updateTask(task);
  }

  deleteTask(taskId){
    this.service.deleteTask(taskId)
  }

  loginWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((data) => {
      console.log('loging success ',data)
    }, (err) => {
      console.log('Fail throw erred to login', err)
    }).then((user) =>{
      console.log('logged in user ',user);
    }).catch((err) => console.error(err))
  }

  trackByFn(index,item){
    return index;
  }

}
