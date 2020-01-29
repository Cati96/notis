import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog, MatTable} from '@angular/material';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ServiceService} from '../../../services/service.service';
import {Service} from '../../../models/service.model';
import {DialogBoxServiceAdminComponent} from '../modals/dialog-box-service-admin/dialog-box-service-admin.component';
import {DialogBoxDocumentsAdminComponent} from '../modals/dialog-box-documents-admin/dialog-box-documents-admin.component';

@Component({
  selector: 'app-services-notary-translator',
  templateUrl: './admin-services-notary-translator.component.html',
  styleUrls: ['./admin-services-notary-translator.component.css']
})
export class AdminServicesNotaryTranslatorComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  sub: any;
  browserRefresh = false;

  displayedColumns = ['ID', 'Type', 'Description', 'Documents', 'Actions'];
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

  openDialog(action, service) {
    const dialogRef = this.dialog.open(DialogBoxServiceAdminComponent, {
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
    let idt = this.entityId;
    if( this.entityType !== 'Notary')
         idt = idt * -1;

    this.serviceService.add(service, idt).subscribe(json => {
                   this.services.push(json);
                   this.table.renderRows();
          });
  }

  updateService(service) {
    console.log('TO DO UPDATE SERVICE');
    let idt = this.entityId;
        if( this.entityType !== 'Notary')
             idt = idt * -1;

        this.serviceService.update(service, idt).subscribe(json => {
                       console.log(json)
              });
  }

  deleteService(serviceID) {
    console.log('TO DO DELETE SERVICE BY ID');
    let idt = this.entityId;
    if( this.entityType !== 'Notary')
         idt = idt * -1;
    this.serviceService.delete(serviceID, idt).subscribe(result => {
                     console.log(result);
                     this.findAndDeleteServiceFromArray(serviceID);
            },
            err => console.log(err)
           )
  }

  showAllDocuments(serviceID) {
    this.dialog.open(DialogBoxDocumentsAdminComponent, {
      width: '90%',
      data: {
        serviceId: serviceID,
        entityType: this.entityType.toLowerCase(),
        entityId: this.entityId
      }
    });
    this.table.renderRows();
  }
findAndDeleteServiceFromArray(serviceId){
      let index = this.services.findIndex( service => service.id === serviceId );
      this.services.splice(index,1);
      this.table.renderRows();
    }
}
