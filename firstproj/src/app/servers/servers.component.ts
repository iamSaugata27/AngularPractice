import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = "";
  serverName = "";
  serverCreated = false;

  constructor() {
    setTimeout(() => this.allowNewServer = true, 3000);
  }

  ngOnInit(): void {
  }

  onCreateServer = () => {
    this.serverCreated = true;
    this.serverCreationStatus = "Server was created!" + ` And server name is ${this.serverName}`;
  }

  onUpdateServerName = (event: Event) => this.serverName = (<HTMLInputElement>event.target).value;

}
