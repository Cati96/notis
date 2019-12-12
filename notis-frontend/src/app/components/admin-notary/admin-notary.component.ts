import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Notary} from '../../models/notary.model';
import {NotaryService} from '../../services/notary.service';
import {MatDialog, MatTable} from '@angular/material';
import {DialogBoxNotaryTranslatorComponent} from '../modals/dialog-box-notary-translator/dialog-box-notary-translator.component';
import {Subscription} from 'rxjs';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {DialogBoxAddressComponent} from '../modals/dialog-box-address/dialog-box-address.component';
import {DialogBoxTimetableComponent} from '../modals/dialog-box-timetable/dialog-box-timetable.component';
import {DialogBoxServicesComponent} from '../modals/dialog-box-services/dialog-box-services.component';

export let browserRefresh = false;

@Component({
  selector: 'app-admin-notary',
  templateUrl: './admin-notary.component.html',
  styleUrls: ['./admin-notary.component.css']
})
export class AdminNotaryComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  private displayedColumns = ['ID', 'Name', 'Authorization number', 'Phone number', 'Address', 'Timetable', 'Services', 'Actions'];
  private notaries: Notary[];

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
        browserRefresh = !router.navigated;
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

  findAllNotaries() {
    this.notaries = this.notaryService.getAllNotaries();
    console.log('TO DO GET ALL NOTARIES');
  }

  openDialog(action, notary) {
    const dialogRef = this.dialog.open(DialogBoxNotaryTranslatorComponent, {
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
    this.dialog.open(DialogBoxAddressComponent, {
      width: '30%',
      data: {
        data: address,
        entityType: 'Notary'
      }
    });
    this.table.renderRows();
  }

  showTimetableDetails(timetable) {
    this.dialog.open(DialogBoxTimetableComponent, {
      width: '30%',
      data: {
        data: timetable,
        entityType: 'Notary'
      }
    });
    this.table.renderRows();
  }

  showServicesDetails(services) {
    this.router.navigate(['admin-notary/services']);
  }
}
