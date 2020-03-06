import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppointmentModel } from '../../models/appointment.model';

@Component({
  selector: 'app-upcoming-appointments',
  templateUrl: './upcoming-appointments.component.html',
  styleUrls: ['./upcoming-appointments.component.css']
})
export class UpcomingAppointmentsComponent {
  @Input() appointmentTitle: string;
  @Output() confirmedButton = new EventEmitter<string>();
  @Input() appointments: AppointmentModel[];

  onClickedConfirmed(event) {
    this.confirmedButton.emit(event.target.value);
    console.log('confirmed');
  }

}
