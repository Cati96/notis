import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page-toolbar',
  templateUrl: './main-page-toolbar.component.html',
  styleUrls: ['./main-page-toolbar.component.css']
})
export class MainPageToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
