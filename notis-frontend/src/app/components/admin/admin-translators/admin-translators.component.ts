import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Translator} from '../../../models/translator.model';
import {MatDialog, MatTable} from '@angular/material';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {DialogBoxNotaryTranslatorAdminComponent} from '../modals/dialog-box-notary-translator-admin/dialog-box-notary-translator-admin.component';
import {DialogBoxAddressAdminComponent} from '../modals/dialog-box-address-admin/dialog-box-address-admin.component';
import {DialogBoxTimetableAdminComponent} from '../modals/dialog-box-timetable-admin/dialog-box-timetable-admin.component';
import {TranslatorService} from '../../../services/translator.service';

@Component({
  selector: 'app-admin-translators',
  templateUrl: './admin-translators.component.html',
  styleUrls: ['./admin-translators.component.css']
})
export class AdminTranslatorsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  browserRefresh = false;

  displayedColumns = ['ID', 'Name', 'Authorization number', 'Phone number', 'Languages', 'Address', 'Timetable', 'Services', 'Actions'];
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

  openDialog(action, translator) {
    const dialogRef = this.dialog.open(DialogBoxNotaryTranslatorAdminComponent, {
        width: '50%',
        data: {
          data: translator,
          actionMade: action,
          entityType: 'translator'
        }
      })
    ;

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addTranslator(result.data);
      } else if (result.event === 'Update') {
        this.updateTranslator(result.data);
      } else if (result.event === 'Delete') {
        this.deleteTranslator(result.data.id);
      }
    });
  }

  addTranslator(translator) {
    this.table.renderRows();
    console.log('TO DO ADD NEW TRANSLATOR');

  }

  updateTranslator(translator) {
    console.log('TO DO UPDATE TRANSLATOR');
  }

  deleteTranslator(translator) {
    console.log('TO DO DELETE TRANSLATOR BY ID');
  }

  showAddressDetails(address) {
    this.dialog.open(DialogBoxAddressAdminComponent, {
      width: '30%',
      data: {
        data: address,
        entityType: 'Translator'
      }
    });
    this.table.renderRows();
  }

  showTimetableDetails(timetable) {
    this.dialog.open(DialogBoxTimetableAdminComponent, {
      width: '30%',
      data: {
        data: timetable,
        entityType: 'Translator'
      }
    });
    this.table.renderRows();
  }

  showServicesDetails(services) {
    this.router.navigate(['admin-translators/services']);
  }
}

