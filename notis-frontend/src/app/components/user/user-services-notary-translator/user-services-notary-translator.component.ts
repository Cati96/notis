import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Service} from '../../../models/service.model';
import {MatDialog, MatTable} from '@angular/material';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ServiceService} from '../../../services/service.service';
import {DialogBoxDocumentsUserComponent} from '../modals/dialog-box-documents-user/dialog-box-documents-user.component';

@Component({
  selector: 'app-user-services-notary-translator',
  templateUrl: './user-services-notary-translator.component.html',
  styleUrls: ['./user-services-notary-translator.component.css']
})
export class UserServicesNotaryTranslatorComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  browserRefresh = false;

  displayedColumns = ['Type', 'Description', 'Documents'];
  services: Service[];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private router: Router, private serviceService: ServiceService, private dialog: MatDialog) {
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
    this.findAllServices();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  doRefreshData() {
    this.findAllServices();
  }

  findAllServices() {
    this.serviceService.getAllServices().subscribe(json => {
      this.services = json;
    });
    console.log('TO DO GET ALL SERVICES');
  }

  showAllDocuments(serviceID) {
    this.dialog.open(DialogBoxDocumentsUserComponent, {
      width: '90%',
      data: {
        serviceId: serviceID,
        entityType: 'notary'
      }
    });
    this.table.renderRows();
  }
}
