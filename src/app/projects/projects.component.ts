import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  entries;

  constructor() { }

  ngOnInit(): void {
    getGitQuery().then((query) => this.entries = query);
    console.log(this.entries);
  }
}

async function getGitQuery(){
  const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
        'Authorization': `bearer 23daaaceb9b25674c3592ef17bfc58828d8d2b0a`
        },
        body: JSON.stringify({
          query: `
          {
            user(login: "luuk180") {
              repositories(first: 99, orderBy: {field: PUSHED_AT, direction: DESC}) {
                nodes {
                  name
                  description
                  url
                  pushedAt
                }
              }
            }
          }
          `,
        }),
  });
  const json = await response.json();
  const data = json.data.user.repositories.nodes;

  return data;
}
