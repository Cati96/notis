import {AfterViewInit, Component, ElementRef, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatButton, MatDialogRef} from '@angular/material';
import {Address} from '../../../../models/address.model';

@Component({
  selector: 'app-dialog-box-address-user',
  templateUrl: './dialog-box-address-user.component.html',
  styleUrls: ['./dialog-box-address-user.component.css']
})
export class DialogBoxAddressUserComponent implements OnInit {

  localData: Address;
  entityType: string;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxAddressUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.localData = data.data;
    this.entityType = data.entityType;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}


