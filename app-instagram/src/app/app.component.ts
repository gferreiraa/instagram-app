import { Component, OnInit } from '@angular/core';
// * asterisco para utilização de alias.
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-instagram';

  ngOnInit(): void {
    // Configuração com o Firebase
    var config = {
      apiKey: 'AIzaSyBIz55M9y-8ya45CyX2F_-pnEbVhdTW0Wo',
      authDomain: 'instagram-clone-e83ef.firebaseapp.com',
      databaseURL: 'https://instagram-clone-e83ef.firebaseio.com',
      projectId: 'instagram-clone-e83ef',
      storageBucket: 'instagram-clone-e83ef.appspot.com',
      messagingSenderId: '498663363761'
    };
    firebase.initializeApp(config);
  }
}
