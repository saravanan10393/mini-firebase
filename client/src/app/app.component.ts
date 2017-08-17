import { Component, NgZone } from '@angular/core';
import {default as kfClient} from './kfbase.client';
import { DataService } from './app.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  tasks = {}

  constructor(private service: DataService ,private cdr : NgZone){
    setTimeout(() => {
      service.getTasks().subscribe((tasks) => {
        this.tasks = tasks;
      })
    },2000);
  }

  addTask(name){
    kfClient.ref('tasks').push().set({
        name 
    });
  }

  deleteTask(name){
    let taskId = null;
    for(let key in this.tasks){
      if(this.tasks[key].name == name){
        taskId = key;
      }
    }
    kfClient.ref(`tasks/${taskId}`).delete();
  }

}
