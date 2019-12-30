import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Timetable} from '../../../../models/timetable.model';

@Component({
  selector: 'app-dialog-box-timetable-user',
  templateUrl: './dialog-box-timetable-user.component.html',
  styleUrls: ['./dialog-box-timetable-user.component.css']
})
export class DialogBoxTimetableUserComponent implements OnInit {

  localData: Timetable;
  entityType: string;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxTimetableUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.localData = data.data;
    this.entityType = data.entityType;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
