import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Notary} from '../../../models/notary.model';
import {NotaryService} from '../../../services/notary.service';
import {MatDialog, MatTable} from '@angular/material';
import {DialogBoxNotaryTranslatorAdminComponent} from '../modals/dialog-box-notary-translator-admin/dialog-box-notary-translator-admin.component';
import {Subscription} from 'rxjs';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {DialogBoxAddressAdminComponent} from '../modals/dialog-box-address-admin/dialog-box-address-admin.component';
import {DialogBoxTimetableAdminComponent} from '../modals/dialog-box-timetable-admin/dialog-box-timetable-admin.component';

@Component({
  selector: 'app-admin-notary',
  templateUrl: './admin-notaries.component.html',
  styleUrls: ['./admin-notaries.component.css']
})
export class AdminNotariesComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  browserRefresh = false;

  displayedColumns = ['ID', 'Name', 'Authorization number', 'Phone number', 'Address', 'Timetable', 'Services', 'Actions'];
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

  openDialog(action, notary) {
    const dialogRef = this.dialog.open(DialogBoxNotaryTranslatorAdminComponent, {
        width: '50%',
        data: {
          data: notary,
          actionMade: action,
          entityType: 'notary'
        }
      })
    ;

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addNotary(result.data);
      } else if (result.event === 'Update') {
        this.updateNotary(result.data);
      } else if (result.event === 'Delete') {
        this.deleteNotary(result.data.id);
      }
    });
  }

  addNotary(notary) {
    this.table.renderRows();
    console.log('TO DO ADD NEW NOTARY');

  }

  updateNotary(notary) {
    console.log('TO DO UPDATE NOTARY');
  }

  deleteNotary(notaryID) {
    console.log('TO DO DELETE NOTARY BY ID');
  }

  showAddressDetails(address) {
    this.dialog.open(DialogBoxAddressAdminComponent, {
      width: '30%',
      data: {
        data: address,
        entityType: 'Notary'
      }
    });
    this.table.renderRows();
  }

  showTimetableDetails(timetable) {
    this.dialog.open(DialogBoxTimetableAdminComponent, {
      width: '30%',
      data: {
        data: timetable,
        entityType: 'Notary'
      }
    });
    this.table.renderRows();
  }

  showServicesDetailsForEntityId(id) {
    this.router.navigate(['admin-notaries/services'], {queryParams: {entityType: 'Notary', entityId: id}});
  }
}
