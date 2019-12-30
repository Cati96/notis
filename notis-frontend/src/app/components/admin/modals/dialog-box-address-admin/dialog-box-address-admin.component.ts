import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Address} from '../../../../models/address.model';

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

  constructor(
    public dialogRef: MatDialogRef<DialogBoxAddressAdminComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.localData = data.data;
    this.entityType = data.entityType;
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
  }

  deleteAddress(id) {
    console.log('TO DO DELETE ADDRESS BY ID');
  }
}


