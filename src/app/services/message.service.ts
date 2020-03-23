import { MessageModel } from '../models/message.model';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { AppointmentModel } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: MessageModel[] = [];
  private message = new MessageModel();

  constructor(public databaseService: DatabaseService) {}

  async createMessage(message: MessageModel) {
   await this.databaseService.insert<MessageModel>('messages', message);
  }

 async getAllDoctorEmails(doctorGUID: string) {
/*    const doctorMessages = this.messages.filter(message => message.doctorEmail.guid === doctorGUID);
    const lastMessages = [];

    for (const message of this.messages) {
      if (!message.replyTo) {
        message.conversation = [];
        message.conversation.push(message);
        let guid = message.guid;
        let replayed;
        do {
          replayed = doctorMessages.find(dm => dm.replyTo === guid);
          if (replayed) {
            message.conversation.push(replayed);
            guid = replayed.guid;
          }
        } while (replayed);
        lastMessages.push(this.replaceLastWithFirst(message));
      }
    }
    return lastMessages;*/
  return  await this.databaseService.getAll<MessageModel>('messages', doctorGUID);
  }

  private replaceLastWithFirst(message: MessageModel) {
    const last = message.conversation.pop();
    return Object.assign({}, message, last, {
      conversation: message.conversation
    });
  }

  updateArchive(messageGUID: string) {
    if (confirm('Are you sure you want to confirm?')) {
      return this.messages.find(message => message.guid === messageGUID).archive = true;
    }
  }

  deleteMessage(messageGUID: string) {
    if (confirm('Are you sure you want to confirm?')) {
      const messageIndex = this.messages.findIndex(message => message.guid === messageGUID);
      if (messageIndex === 0) {
        this.messages.splice(messageIndex, 1);
        this.messages[messageIndex].replyTo = null;
      }
      if (messageIndex > 0) {
        this.messages.splice(messageIndex, 1);
        if (this.messages[messageIndex]) {
          this.messages[messageIndex].replyTo = this.messages[messageIndex - 1].guid;
        }
      }
      return this.messages;
    }
  }

  getEmail(messageGUID: string) {
    return this.messages.find(message => message.guid === messageGUID);
  }


}
