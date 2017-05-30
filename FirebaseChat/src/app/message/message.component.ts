import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  data: Array<any[]>;
  items: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.items = db.list('/chat');
    this.items.subscribe(item => {

      this.data = [];

      for (let i in item) {

        let date;
        let diff = moment(item[i].date).diff(moment().format('YYYY-MM-DD HH:mm:ss'), 'days');
        if (diff > 0) {
          date = moment(item[i].date).format('MM-DD hh:mm:ss a');
        } else {
          date = moment(item[i].date).format('hh:mm:ss a');
        }

        this.data.push(
          Object({
            usr: item[i].usr,
            msg: item[i].msg,
            date: date
          })
        );

      }

    });

  }

  moveScroll() {
    let message = document.getElementById('message');
    message.scrollTop = message.scrollHeight;
  }

}