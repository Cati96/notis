import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Timetable} from '../../../../models/timetable.model';
import {TimetableService} from '../../../../services/timetable.service';
@Component({
  selector: 'app-dialog-box-timetable-admin',
  templateUrl: './dialog-box-timetable-admin.component.html',
  styleUrls: ['./dialog-box-timetable-admin.component.css']
})
export class DialogBoxTimetableAdminComponent implements OnInit {

  localData: Timetable;
  entityType: string;
  isEditing: boolean;
  isDeleting: boolean;
  editButtonIcon: string;
  entityId : number;
  constructor(
    private timetableService : TimetableService,
    public dialogRef: MatDialogRef<DialogBoxTimetableAdminComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.localData = data.data;
    this.entityType = data.entityType;
    this.entityId = data.entityId;
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
    let idt = this.entityId;
    if( this.entityType !== 'Notary')
        idt = idt * -1;
    this.timetableService.update(this.localData, idt).subscribe(json => {
                        console.log(json);
                });
  }

  deleteAddress(id: number) {
    console.log('TO DO DELETE TIMETABLE BY ID');
    this.localData.monday='None';
    this.localData.tuesday='None';
    this.localData.wednesday='None';
    this.localData.thursday='None';
    this.localData.friday='None';
    this.localData.saturday='None';
    this.localData.sunday='None';
    let idt = this.entityId;
    if( this.entityType !== 'Notary')
            idt = idt * -1;
    this.timetableService.update(this.localData, idt).subscribe(json => {
               console.log(json);
     });

  }

}
