import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog, MatTable} from '@angular/material';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ServiceService} from '../../services/service.service';
import {Service} from '../../models/service.model';
import {DialogBoxServiceComponent} from '../modals/dialog-box-service/dialog-box-service.component';
import {DialogBoxDocumentsComponent} from '../modals/dialog-box-documents/dialog-box-documents.component';

@Component({
  selector: 'app-services-notary-translator',
  templateUrl: './services-notary-translator.component.html',
  styleUrls: ['./services-notary-translator.component.css']
})
export class ServicesNotaryTranslatorComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  browserRefresh = false;

  displayedColumns = ['ID', 'Type', 'Description', 'Documents', 'Actions'];
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

  openDialog(action, service) {
    const dialogRef = this.dialog.open(DialogBoxServiceComponent, {
        width: '40%',
        data: {
          data: service,
          actionMade: action
        }
      })
    ;

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addService(result.data);
      } else if (result.event === 'Update') {
        this.updateService(result.data);
      } else if (result.event === 'Delete') {
        this.deleteService(result.data.id);
      }
    });
  }

  addService(service) {
    console.log('TO DO ADD NEW SERVICE');
    this.table.renderRows();

  }

  updateService(service) {
    console.log('TO DO UPDATE SERVICE');
    this.table.renderRows();
  }

  deleteService(serviceID) {
    console.log('TO DO DELETE SERVICE BY ID');
    this.table.renderRows();
  }

  showAllDocuments(serviceID) {
    this.dialog.open(DialogBoxDocumentsComponent, {
      width: '90%',
      data: {
        serviceId: serviceID,
        entityType: 'notary'
      }
    });
    this.table.renderRows();
  }

}
