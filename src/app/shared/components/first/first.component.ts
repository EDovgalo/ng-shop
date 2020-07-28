import {Component, OnInit} from '@angular/core';
import {CategoryEnum} from '../../models/category.model';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  name = 'First Component';
  description = 'This is first Component';
  price = 1000;
  isAvailable = true;
  category: CategoryEnum

  constructor() {
  }

  ngOnInit(): void {
  }

}
