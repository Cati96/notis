import {Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTable} from '@angular/material';
import {DocumentService} from '../../../../services/document.service';
import {Document} from '../../../../models/document.model';
import {saveAs as importedSaveAs} from 'file-saver';

@Component({
  selector: 'app-dialog-box-documents-user',
  templateUrl: './dialog-box-documents-user.component.html',
  styleUrls: ['./dialog-box-documents-user.component.css']
})
export class DialogBoxDocumentsUserComponent implements OnInit {

  displayedColumns = ['Type', 'Format', 'Price', 'Template'];

  serviceId: number;
  documents: Document[];
  entityType: string;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private documentService: DocumentService,
              private dialogRef: MatDialogRef<DialogBoxDocumentsUserComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.serviceId = data.serviceId;
    this.entityType = data.entityType;
    this.getAllDocumentsForService();
  }

  ngOnInit() {
  }

  doRefreshData() {
    this.getAllDocumentsForService();
  }

  getAllDocumentsForService() {
    this.documentService.getAllDocumentsForServiceId(this.serviceId)
      .subscribe(json => {
          this.documents = json;
        }
      )
    ;
    console.log('TO DO GET ALL DOCUMENTS FOR SERVICE ID');
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  doOpenDocument(templateType) {
    this.documentService.downloadFile().subscribe(blob => {
        importedSaveAs(blob, templateType);
      }
    );
  }
}
