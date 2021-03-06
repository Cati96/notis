import {Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTable} from '@angular/material';
import {DocumentService} from '../../../../services/document.service';
import {Document} from '../../../../models/document.model';
import {DocumentCustom} from '../../../../models/custom-models/document-custom.model';
import {saveAs as importedSaveAs} from 'file-saver';

@Component({
  selector: 'app-dialog-box-documents-admin',
  templateUrl: './dialog-box-documents-admin.component.html',
  styleUrls: ['./dialog-box-documents-admin.component.css']
})
export class DialogBoxDocumentsAdminComponent implements OnInit {

  displayedColumns = ['ID', 'Type', 'Format', 'Price', 'Template', 'Actions'];

  serviceId: number;
  documents: DocumentCustom[];
  entityType: string;
  isDeleting: boolean;
  hiddenId: number;
  entityId: number;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private documentService: DocumentService,
              public dialogRef: MatDialogRef<DialogBoxDocumentsAdminComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.serviceId = data.serviceId;
    this.entityType = data.entityType;
    this.entityId = data.entityId;
    this.isDeleting = false;
    this.documents = [];
    this.getAllDocumentsForServiceId();
  }

  ngOnInit() {
  }

  onChangeFile(documentCustom, event) {
    console.log('File changed');
    // const elementClass = event.target.attributes.class.nodeValue;
    documentCustom.hasFileToUpload = true;
    documentCustom.isFileUploaded = false;
  }

  doRefreshData() {
    this.getAllDocumentsForServiceId();
  }

  getAllDocumentsForServiceId() {
    let temp;
    this.documentService.getAllDocumentsForEntityTypeServiceId(this.entityType, this.serviceId, this.entityId)
      .subscribe(json => {
          temp = json;
          console.log(temp);

          this.documents = [];
          for (const obj of temp) {
            const docCustom = new DocumentCustom();
            const doc = new Document(obj);
            docCustom.id = doc.id;
            docCustom.format = doc.format;
            docCustom.price = doc.price;
            docCustom.template = doc.template;
            docCustom.type = doc.type;
            docCustom.isAddedNew = false;
            docCustom.isEdited = false;
            docCustom.editButtonIcon = 'Edit';
            docCustom.isFileUploaded = false;
            docCustom.hasFileToUpload = false;
            this.documents.push(docCustom);
          }
          this.table.renderRows();
        }
      )
    ;
    console.log('TO DO GET ALL DOCUMENTS FOR ENTITY TYPE AND SERVICE ID');
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  doEdit(documentCustom) {
    if (documentCustom.isEdited === false) {
      documentCustom.isEdited = true;
      documentCustom.editButtonIcon = 'Update';
    } else {
      if ((documentCustom.hasFileToUpload && documentCustom.isFileUploaded) || (!documentCustom.hasFileToUpload)) {
        documentCustom.isEdited = false;
        documentCustom.editButtonIcon = 'Edit';
      } else {
        alert('You have to upload the file first');
      }
      this.updateDocument(documentCustom);

      console.log('TO DO UPDATE DOCUMENT');
    }
  }

  doDelete(documentCustom) {
    this.deleteDocument(documentCustom.id);
  }

  createDocument(documentCustom) {
    console.log('TO DO CREATE DOCUMENT');
  }

  updateDocument(documentCustom) {
    console.log('TO DO UPDATE DOCUMENT');
    console.log(documentCustom);
    console.log(this.documents);
    this.documentService.updateOrCreateDocument(this.entityType, this.entityId, this.serviceId, documentCustom).subscribe(
      json => console.log(json)
    );
  }

  deleteDocument(id) {
    console.log('TO DO DELETE DOCUMENT BY ID');
    this.documentService.deleteDocument(this.entityType, this.entityId, this.serviceId, id).subscribe(
      json => {
        console.log(json);
        this.findAndDeleteDocumentFromArray(id);
      }
    );
  }

  doOpenDocument(templateType) {
    this.documentService.downloadFile().subscribe(blob => {
        console.log('Document name:', templateType);
        importedSaveAs(blob, templateType);
      }
    );
  }

  doUploadDocument(documentCustom, file) {
    documentCustom.isFileUploaded = true;
    this.documentService.uploadFile(file.files[0]).subscribe(json => {
        const temp = json.toString();
        if (temp.includes('success') && temp.includes('false')) {
          alert('There is an error on uploading your file.\nTry again please.');
        } else {
          documentCustom.template = temp;
          this.documentService.updateOrCreateDocument(this.entityType, this.entityId, this.serviceId, documentCustom).subscribe(
            json => console.log(json)
          );
        }
      }
    );
  }

  doAddNewRowForDocument() {
    const temp = new DocumentCustom();
    temp.format = '';
    temp.price = 0.0;
    temp.template = null;
    temp.type = '';
    temp.isEdited = true;
    temp.editButtonIcon = 'Update';
    temp.isAddedNew = true;
    this.documents.unshift(temp);

    this.table.renderRows();
  }

  findAndDeleteDocumentFromArray(documentId) {
    let index = this.documents.findIndex(notary => notary.id === documentId);
    this.documents.splice(index, 1);

  }
}
