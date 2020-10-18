import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  entries;

  constructor() {
    getGitQuery().then((query) => this.entries = query);
    console.log(this.entries);
  }

  ngOnInit(): void { }
}

async function getGitQuery(){
  const response = await fetch('https://us-central1-luuk180-dev.cloudfunctions.net/GitHubAPI', {
    method: 'GET',
  });
  const json = await response.json();

  return json;
}
