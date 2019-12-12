import {Component, Inject, Optional} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Notary} from '../../../models/notary.model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box-notary-translator.component.html',
  styleUrls: ['./dialog-box-notary-translator.component.css']
})
export class DialogBoxNotaryTranslatorComponent {

  private action: string;
  private localData: Notary;
  private entityType: string;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxNotaryTranslatorComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.localData = data.data;
    this.action = data.actionMade;
    this.entityType = data.entityType;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}