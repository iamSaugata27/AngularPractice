import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {

  username = '';
  showSecret = false;
  logs: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onToggleDetails = () => {
    this.showSecret = !this.showSecret;
    // this.logs.push(this.logs.length + 1);
    this.logs.push(new Date().toTimeString());
  }

}
