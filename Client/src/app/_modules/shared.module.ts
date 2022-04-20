import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// primeng module addon
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputMaskModule } from "primeng/inputmask";
import { MultiSelectModule } from "primeng/multiselect";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageModule } from "primeng/message";
import { ChipsModule } from "primeng/chips";
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FieldsetModule } from 'primeng/fieldset';
import { TabViewModule } from 'primeng/tabview';

// ngx module addon
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    TabViewModule,
    FieldsetModule,
    ToggleButtonModule,
    CheckboxModule,
    DividerModule,
    ToastModule,
    StepsModule,
    TabMenuModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    DividerModule,
    KeyFilterModule,
    RatingModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    DialogModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ScrollPanelModule,
    ScrollTopModule,
    DynamicDialogModule,
    MessageModule,
    ChipsModule,
    ChipModule,
    CalendarModule,
    FileUploadModule,
    InputNumberModule,
  ],
  exports: [
    TabViewModule,
    FieldsetModule,
    CheckboxModule,
    ToastModule,
    StepsModule,
    TabMenuModule,
    RatingModule,
    ToggleButtonModule,
    DividerModule,
    KeyFilterModule,
    ToastrModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    DialogModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ScrollPanelModule,
    ScrollTopModule,
    DynamicDialogModule,
    MessageModule,
    ChipsModule,
    ChipModule,
    CalendarModule,
    FileUploadModule,
    InputNumberModule,
  ]
})
export class SharedModule { }
