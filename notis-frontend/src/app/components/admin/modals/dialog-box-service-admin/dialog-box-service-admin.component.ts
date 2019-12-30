import {Component, Inject, Optional} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Service} from '../../../../models/service.model';

@Component({
  selector: 'app-dialog-box-service-admin',
  templateUrl: './dialog-box-service-admin.component.html',
  styleUrls: ['./dialog-box-service-admin.component.css']
})
export class DialogBoxServiceAdminComponent {

  action: string;
  localData: Service;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxServiceAdminComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.localData = data.data;
    this.action = data.actionMade;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
