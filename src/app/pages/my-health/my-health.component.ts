import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-health',
  templateUrl: './my-health.component.html',
  styleUrls: ['./my-health.component.css']
})
export class MyHealthComponent implements OnInit {
  currentUser$: Observable<EmployeeModel>;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.currentUser$ = this.employeeService.getLoggedEmployee$();
  }

}
