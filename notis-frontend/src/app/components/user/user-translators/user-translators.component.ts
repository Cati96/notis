import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog, MatTable} from '@angular/material';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {DialogBoxAddressUserComponent} from '../modals/dialog-box-address-user/dialog-box-address-user.component';
import {DialogBoxTimetableUserComponent} from '../modals/dialog-box-timetable-user/dialog-box-timetable-user.component';
import {TranslatorService} from '../../../services/translator.service';
import {Translator} from '../../../models/translator.model';

@Component({
  selector: 'app-user-translators',
  templateUrl: './user-translators.component.html',
  styleUrls: ['./user-translators.component.css']
})
export class UserTranslatorsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  browserRefresh = false;

  displayedColumns = ['Name', 'Authorization number', 'Phone number', 'Languages', 'Address', 'Timetable', 'Services'];
  translators: Translator[];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private router: Router, private translatorService: TranslatorService, private dialog: MatDialog) {
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
    this.findAllTranslators();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  doRefreshData() {
    this.findAllTranslators();
  }

  findAllTranslators() {
    this.translatorService.getAllTranslators().subscribe(json => {
      this.translators = json;
    });
    console.log('TO DO GET ALL TRANSLATORS');
  }

  showAddressDetails(address) {
    this.dialog.open(DialogBoxAddressUserComponent, {
      width: '80%',
      data: {
        data: address,
        entityType: 'Translator'
      }
    });
    this.table.renderRows();
  }

  showTimetableDetails(timetable) {
    this.dialog.open(DialogBoxTimetableUserComponent, {
      width: '30%',
      data: {
        data: timetable,
        entityType: 'Translator'
      }
    });
    this.table.renderRows();
  }

  showServicesDetails(services) {
    this.router.navigate(['translators/services']);
  }
}
