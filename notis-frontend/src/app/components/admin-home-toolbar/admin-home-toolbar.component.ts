import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-home-toolbar',
  templateUrl: './admin-home-toolbar.component.html',
  styleUrls: ['./admin-home-toolbar.component.css']
})
export class AdminHomeToolbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['admin-login']);
  }

}
