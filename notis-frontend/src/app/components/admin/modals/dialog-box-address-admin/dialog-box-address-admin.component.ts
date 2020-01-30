import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Address} from '../../../../models/address.model';
import {AddressService} from '../../../../services/address.service';
import {CountyCityLocality} from '../../../../core/county.city.locality';

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

  ccl = new CountyCityLocality();

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

    this.setCountyCityLocality();
  }

  ngOnInit(): void {
  }

  setCountyCityLocality(): void {
    this.ccl.selectedCounty = this.ccl.counties[0];
    this.ccl.selectedCity = this.ccl.cities[0];
    this.ccl.selectedLocality = this.ccl.localities[0];
    this.ccl.isCountySelected = false;
    this.ccl.isCitySelected = false;
    this.ccl.isLocalitySelected = false;

    const county = this.localData.county;
    if (county !== undefined && county !== null && county.trim() !== '') {
      const index = this.ccl.getCountyIndexOnList(county);
      if (index !== -1) {
        this.ccl.selectedCounty = this.ccl.counties[index];
        this.ccl.isCountySelected = true;
        this.ccl.onChangeCounty(county);
        console.log('selected county:', this.ccl.selectedCounty);
      }
    }

    const city = this.localData.city;
    if (city !== undefined && city !== null && city.trim() !== '') {
      const index = this.ccl.getCityIndexOnList(city);
      if (index !== -1) {
        this.ccl.selectedCity = this.ccl.cities[index];
        this.ccl.isCitySelected = true;
        this.ccl.onChangeCity(city);
        console.log('selected city:', this.ccl.selectedCity);
      }
    }

    const locality = this.localData.locality;
    if (locality !== undefined && locality !== null && locality.trim() !== '') {
      const index = this.ccl.getLocalityIndexOnList(locality);
      if (index !== -1) {
        this.ccl.selectedLocality = this.ccl.localities[index];
        this.ccl.isLocalitySelected = true;
        this.ccl.onChangeLocality(locality);
        console.log('selected locality:', this.ccl.selectedLocality);
      }
    }
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

      this.localData.county = this.ccl.selectedCounty;
      this.localData.city = this.ccl.selectedCity;
      this.localData.locality = this.ccl.selectedLocality;
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
    let idt = this.entityId;
    if (this.entityType !== 'Notary') {
      idt = idt * -1;
    }
    this.addressService.update(address, idt).subscribe(json => {
      console.log(json);
    });
  }

  deleteAddress(id) {
    const address = this.localData;
    address.country = '';
    address.county = '';
    address.city = '';
    address.street = '';
    address.streetNumber = '';
    address.others = '';
    let idt = this.entityId;
    if (this.entityType !== 'Notary') {
      idt = idt * -1;
    }
    this.addressService.update(address, idt).subscribe(json => {
      console.log(json);
    });
  }
}


