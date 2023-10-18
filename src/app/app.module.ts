import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgOptimizedImage } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { HousieBoardComponent } from './housie-board/housie-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CheckNumbersComponent } from './check-numbers/check-numbers.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenerateRandomNumberComponent } from './generate-random-number/generate-random-number.component';

@NgModule({
  declarations: [
    AppComponent,
    HousieBoardComponent,
    DashboardComponent,
    CheckNumbersComponent,
    GenerateRandomNumberComponent
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    NgOptimizedImage,
    CheckboxModule,
    RadioButtonModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule,

  ],
  providers   : [DialogService, MessageService],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
