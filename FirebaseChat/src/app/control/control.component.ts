import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
})
export class ControlComponent {

  usr: string = undefined;
  msg: string = undefined;
  items: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.usr = sessionStorage.getItem('usr');
    this.items = db.list('/chat');
  }

  addItem() {

    if (this.usr == undefined || this.msg == undefined) {
      alert('Please input your name or message.')
    } else {

      sessionStorage.setItem("usr", this.usr);

      this.db.database.ref('chat/' + moment().format('YYYY-MM-DD HH:mm:ss')).set({
        usr: this.usr,
        msg: this.msg,
        date: moment().format('YYYY-MM-DD HH:mm:ss')
      });

      this.msg = undefined;
    }
  }

  addIitemListener(event) {

    var char = event.which || event.keyCode;
    if (char == 13) this.addItem();
  }
}
