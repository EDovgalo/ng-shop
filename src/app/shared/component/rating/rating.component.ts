import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() countStart: number;
  @Input() rating = 0;

  private arrayStars: number[];

  constructor() {
  }

  ngOnInit(): void {
    this.arrayStars = new Array(this.countStart);
  }

}
