import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Promotion, StoreFile } from 'src/app/_models/promotion';
import { Store } from 'src/app/_models/store';
import { PromotionService } from 'src/app/_services/promotion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css'],
  providers: [FileUpload, MessageService]
})
export class PromotionComponent implements OnInit {
  listPromoType: any[] = [];
  listValueType: any[] = [];
  listStore: Store[];
  selectedStore: Store[];
  saveStore: Store[] = [];
  storeFile: StoreFile[] = [];
  listPromoDuration: any[] = [];
  file: any = [];

  promotion: Promotion;

  promotionForm: FormGroup;
  numberRegex: RegExp = /^-?(0|[1-9]\d*)?$/;
  titleSelect: string = "Select All";

  isSelectValueType: number;
  isUpload: boolean;
  isSelectAll: boolean;
  isDisabled: boolean = true;
  isChecked: boolean = false;

  promoId: string;
  rootPath = environment.rootPath;

  get promoType() { return this.promotionForm.get('promoType'); }
  get valueType() { return this.promotionForm.get('valueType'); }
  get valuePercentage() { return this.promotionForm.get('valuePercentage'); }
  get valueAmount() { return this.promotionForm.get('valueAmount'); }
  get promoDescription() { return this.promotionForm.get('promoDescription'); }
  get promoDuration() { return this.promotionForm.get('promoDuration'); }
  get itemPath() { return this.promotionForm.get('itemPath'); }

  constructor(private primeNg: PrimeNGConfig, private formBuilder: FormBuilder, private promotionService: PromotionService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.listPromoType = [
      { name: 'Simple Discount' },
      { name: 'Completed Discount' }
    ];

    this.listValueType = [
      { name: 'Percentage' },
      { name: 'Amount' }
    ];

    this.initializeForm();

    this.isDisabled = true;

    this.primeNg.ripple = true;
  }

  initializeForm() {
    this.promotionForm = this.formBuilder.group({
      promoId: [null],
      promoType: [null, Validators.required],
      valueType: [null, Validators.required],
      valuePercentage: [null],
      valueAmount: [null],
      itemPath: [null],
      storeList: [null, Validators.required],
      promoDescription: [null, [Validators.maxLength(30)]],
      promoDuration: [null, Validators.required],
    });
  }

  selectValueType(event: any) {
    if (event.value == "Percentage") {
      this.isSelectValueType = 1;
      this.promotionForm.get('valuePercentage').addValidators(Validators.required);
      this.promotionForm.get('valueAmount').removeValidators(Validators.required);
    } else if (event.value == "Amount") {
      this.isSelectValueType = 2;
      this.promotionForm.get('valueAmount').addValidators(Validators.required);
      this.promotionForm.get('valuePercentage').removeValidators(Validators.required);
    } else {
      this.promotionForm.get('valuePercentage').removeValidators(Validators.required);
      this.promotionForm.get('valueAmount').removeValidators(Validators.required);
    }

    this.promotionForm.get('valuePercentage').setValue(null);
    this.promotionForm.get('valueAmount').setValue(null);
    this.promotionForm.get('valuePercentage').updateValueAndValidity();
  }

  selectPromoDuration(event: any) {
    this.listPromoDuration.push(event);
  }

  onUpload(event: any) {
    this.file = event.files[0];

    this.promotionForm.controls['itemPath'].setValue(this.file ? this.file.name : '');

    const formData = new FormData();
    formData.append('file', this.file, this.file.name);

    this.promotionService.uploadFile(formData).subscribe(result => {
      this.listStore = result;
      this.isUpload = true;
    }, error => {
      this.isUpload = false;
      this.listStore = [];
      this.promotionForm.controls['itemPath'].setValue(null);

      return this.messageService.add({
        severity: "error",
        summary: "error",
        detail: "Please check your format file.",
      });
    });

    //this.applyForm.controls['imageInput'].setValue(this.file ? this.file.name : '');
  }

  onRemove(event: any) {
    this.file = [];
  }

  onRowSelect(event: any) {
    // simply loggin the event,
    // u can do something else with the data
    console.log(event)

    this.saveStore.push(
      {
        'store': event.data['store'],
        'storeName': event.data['storeName']
      }
    )

    console.log(this.saveStore)
    this.promotionForm.get('storeList').setValue(this.saveStore);
  }

  onRowUnselect(event: any) {
    // simply logging the event
    console.log(event)
    this.saveStore.splice(event.store, 1);

    console.log(this.saveStore);
    this.promotionForm.get('storeList').setValue(this.saveStore);
  }

  onSelectAll(event: any) {
    console.log(event)
    if (this.isSelectAll) {
      this.isSelectAll = false;
      this.selectedStore = [];
      this.saveStore = [];

      this.promotionForm.get('storeList').setValue(null);
      console.log(this.saveStore)
      this.titleSelect = "Select All";
    } else {
      this.isSelectAll = true;
      this.selectedStore = [...this.listStore];
      this.saveStore = this.selectedStore;

      this.promotionForm.get('storeList').setValue(this.saveStore);
      console.log(this.saveStore)
      this.titleSelect = "Unselect All";
    }
  }

  clearForm() {
    this.titleSelect = "Select All";
    this.storeFile = [];
    this.isSelectValueType = 0;
    this.listStore = [];
    this.promoId = null;
    this.selectedStore = [];
    this.saveStore = [];
    this.listPromoDuration = [];
    this.promotionForm.reset();

    return this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: "Form has been cleared.",
    });
  }

  downloadResume(path: string) {
    (window as any).open(`${this.rootPath}${path}`, '_blank');
  }

  submitPromotion() {
    let valueType;
    let promoStart = this.promotionForm.value.promoDuration[0];
    let promoEnd = this.promotionForm.value.promoDuration[1];

    if (this.promotionForm.value.valueType == "Percentage") {
      valueType = Number(this.promotionForm.value.valuePercentage);
    } else {
      valueType = Number(this.promotionForm.value.valueAmount);
    }

    let data = {
      promoType: this.promotionForm.value.promoType,
      valueType: valueType,
      promoStart: promoStart,
      promoEnd: promoEnd,
      promoDescription: this.promotionForm.value.promoDescription,
      storeList: this.promotionForm.value.storeList
    };

    this.promotionService.savePromotion(data).subscribe(result => {
      console.log(result)
      this.promoId = result.promoId;
      this.storeFile = result.fileStore;

      console.log(this.storeFile)

      return this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Promotion has been created.",
      });
    }, erorr => {
      return this.messageService.add({
        severity: "error",
        summary: "error",
        detail: "Something went wrong.",
      });
    });
  }
}
