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
    const data = docRef.get().toPromise().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data().data);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });}

  ngOnInit(): void { }
}
