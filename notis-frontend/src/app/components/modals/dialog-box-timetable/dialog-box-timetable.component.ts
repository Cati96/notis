import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Timetable} from '../../../models/timetable.model';

@Component({
  selector: 'app-dialog-box-timetable',
  templateUrl: './dialog-box-timetable.component.html',
  styleUrls: ['./dialog-box-timetable.component.css']
})
export class DialogBoxTimetableComponent implements OnInit {

  localData: Timetable;
  entityType: string;
  isEditing: boolean;
  isDeleting: boolean;
  editButtonIcon: string;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxTimetableComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.localData = data.data;
    this.entityType = data.entityType;
    this.isEditing = false;
    this.isDeleting = false;
    this.editButtonIcon = 'Edit';
  }

  ngOnInit() {
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
      this.updateAddress(this.localData.id);
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

  updateAddress(id: number) {
    console.log('TO DO UPDATE TIMETABLE BY ID');
  }

  deleteAddress(id: number) {
    console.log('TO DO DELETE TIMETABLE BY ID');
  }

}
