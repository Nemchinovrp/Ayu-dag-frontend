import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../../services/data-handler.service';
import {Task} from 'src/app/model/Task';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  tasks: Task[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandler.tasksSubject.subscribe(value => this.tasks = value);
  }
}
