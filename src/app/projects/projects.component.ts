import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(db: AngularFirestore) {
    var docRef = db.collection('GitHubAPI').doc('EcLVxMbaEJQXhChJwNUw');
    docRef.get().then(function(data) {
      if (data.exists) {
        console.log(data.data());
      } else {
        console.log("Document not found");
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  ngOnInit(): void { }
}
