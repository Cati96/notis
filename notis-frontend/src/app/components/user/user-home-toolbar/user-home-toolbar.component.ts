import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page-toolbar',
  templateUrl: './user-home-toolbar.component.html',
  styleUrls: ['./user-home-toolbar.component.css']
})
export class UserHomeToolbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
