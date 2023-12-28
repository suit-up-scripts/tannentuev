import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tannentuev';
  activeYear: number = 2023;


  onYearChanged(year: number) {
    this.activeYear = year;
  }

}
