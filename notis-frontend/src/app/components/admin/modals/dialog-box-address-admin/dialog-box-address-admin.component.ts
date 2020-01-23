import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Address} from '../../../../models/address.model';
import {AddressService} from '../../../../services/address.service';
@Component({
  selector: 'app-dialog-box-address-admin',
  templateUrl: './dialog-box-address-admin.component.html',
  styleUrls: ['./dialog-box-address-admin.component.css']
})
export class DialogBoxAddressAdminComponent implements OnInit {

  localData: Address;
  entityType: string;
  isEditing: boolean;
  isDeleting: boolean;
  editButtonIcon: string;
  entityId: number;

  constructor(
    private addressService: AddressService,
    public dialogRef: MatDialogRef<DialogBoxAddressAdminComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.localData = data.data;
    this.entityType = data.entityType;
    this.entityId = data.entityId;
    this.isEditing = false;
    this.isDeleting = false;
    this.editButtonIcon = 'Edit';
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  doEdit() {
    if (this.isEditing === false) {
      this.isEditing = true;
      this.editButtonIcon = 'Update';
    } else {
      this.isEditing = false;
      this.editButtonIcon = 'Edit';
      this.updateAddress(this.localData);
    }
  }

  doDelete() {
    if (this.isDeleting === false) {
      this.isDeleting = true;
    } else {
      this.isDeleting = false;
    }
  }

  doDeleteYes() {
    this.deleteAddress(this.localData.id);
    this.closeDialog();
  }

  updateAddress(address) {
    console.log('TO DO UPDATE ADDRESS');

    let idt = this.entityId;
        if( this.entityType !== 'Notary')
            idt = idt * -1;
    this.addressService.update(address, idt).subscribe(json => {
                    console.log(json);
            });
  }

  deleteAddress(id) {
    console.log('TO DO DELETE ADDRESS BY ID');
    let address = this.localData;
    address.country = "";
    address.county = "";
    address.city = "";
    address.street = "";
    address.streetNumber = "";
    address.others = "";
    let idt = this.entityId;
            if( this.entityType !== 'Notary')
                idt = idt * -1;
    this.addressService.update(address, idt).subscribe(json => {
                        console.log(json);
                });
  }
}


