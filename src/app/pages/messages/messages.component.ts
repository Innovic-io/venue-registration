import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';
import { MessageModel } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { generateMessages } from '../../data/appointment';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: MessageModel[];
  message = MessageModel;
  currentUser: EmployeeModel;

  constructor(private employeeService: EmployeeService, public messageService: MessageService, public systemService: SystemService) {
  }

  update($event) {
    if ($event) {
      return this.messageService.updateArchive($event);
    }
  }

  delete($event) {
    if ($event) {
      this.messageService.deleteMessage($event);
      this.messages = this.messageService.getAllDoctorEmails(this.currentUser.guid);
    }
  }
  convert($event) {
    if ($event) {
      this.systemService.exportAsPDF($event, $event.title);
    }
  }

  ngOnInit(): void {
    this.currentUser = this.employeeService.getLoggedEmployee();
    this.messages = this.messageService.getAllDoctorEmails(this.currentUser.guid);
  }

}

