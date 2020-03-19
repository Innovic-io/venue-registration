import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MessageModel } from '../../../models/message.model';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent {

  @Input() message: MessageModel;
  @Output() updateAchieve = new EventEmitter<string>();
  @Output() deleteMessage = new EventEmitter<string>();
  @Output() convertToPDF = new EventEmitter<HTMLDivElement>();
  @Input() showButtons = true;

  updateClick(guid) {
    this.updateAchieve.emit(guid);
  }

  deleteClick(guid) {
    this.deleteMessage.emit(guid);
  }

  exportToPDF(event) {
    console.log(event);
    this.convertToPDF.emit(event);
    console.log(this.convertToPDF.emit(event));

  }

}
