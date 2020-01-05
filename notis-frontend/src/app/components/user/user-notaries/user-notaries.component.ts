import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Notary} from '../../../models/notary.model';
import {MatDialog, MatTable} from '@angular/material';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {NotaryService} from '../../../services/notary.service';
import {DialogBoxAddressUserComponent} from '../modals/dialog-box-address-user/dialog-box-address-user.component';
import {DialogBoxTimetableUserComponent} from '../modals/dialog-box-timetable-user/dialog-box-timetable-user.component';

@Component({
  selector: 'app-user-notaries',
  templateUrl: './user-notaries.component.html',
  styleUrls: ['./user-notaries.component.css']
})
export class UserNotariesComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  browserRefresh = false;

  displayedColumns = ['Name', 'Authorization number', 'Phone number', 'Address', 'Timetable', 'Services'];
  notaries: Notary[];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private router: Router, private notaryService: NotaryService, private dialog: MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      } else if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    });
  }

  ngOnInit() {
    this.findAllNotaries();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  doRefreshData() {
    this.findAllNotaries();
  }

  findAllNotaries() {
    this.notaryService.getAllNotaries().subscribe(json => {
      this.notaries = json;
    });
    console.log('TO DO GET ALL NOTARIES');
  }

  showAddressDetails(address) {
    this.dialog.open(DialogBoxAddressUserComponent, {
      width: '80%',
      data: {
        data: address,
        entityType: 'Notary'
      }
    });
    this.table.renderRows();
  }

  showTimetableDetails(timetable) {
    this.dialog.open(DialogBoxTimetableUserComponent, {
      width: '30%',
      data: {
        data: timetable,
        entityType: 'Notary'
      }
    });
    this.table.renderRows();
  }

  showServicesDetailsForEntityId(id) {
    this.router.navigate(['notaries/services'], {queryParams: {entityType: 'Notary', entityId: id}});
  }
}

