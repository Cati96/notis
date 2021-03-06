import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Service} from '../../../models/service.model';
import {MatDialog, MatTable} from '@angular/material';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ServiceService} from '../../../services/service.service';
import {DialogBoxDocumentsUserComponent} from '../modals/dialog-box-documents-user/dialog-box-documents-user.component';

@Component({
  selector: 'app-user-services-notary-translator',
  templateUrl: './user-services-notary-translator.component.html',
  styleUrls: ['./user-services-notary-translator.component.css']
})
export class UserServicesNotaryTranslatorComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  sub: any;
  browserRefresh = false;

  displayedColumns = ['Type', 'Description', 'Documents'];
  services: Service[];
  entityType: string;
  entityId: number;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private route: ActivatedRoute, private router: Router, private serviceService: ServiceService, private dialog: MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

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
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.entityType = params.entityType;
        this.entityId = params.entityId;
      });
    this.findAllServices();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.sub.unsubscribe();
  }

  doRefreshData() {
    this.findAllServices();
  }

  findAllServices() {
    this.serviceService.getAllServicesForEntityTypeAndEntityId(this.entityType, this.entityId).subscribe(json => {
      this.services = json;
    });
    console.log('TO DO GET ALL SERVICES');
  }

  showAllDocuments(serviceID) {
    this.dialog.open(DialogBoxDocumentsUserComponent, {
      width: '90%',
      data: {
        serviceId: serviceID,
        entityType: this.entityType.toLowerCase(),
        entityId: this.entityId
      }
    });
    this.table.renderRows();
  }
}
