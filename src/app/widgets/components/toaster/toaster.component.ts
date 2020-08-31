import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  message: string;
  isWarning: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
