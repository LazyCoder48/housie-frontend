import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector   : 'app-check-numbers',
  templateUrl: './check-numbers.component.html',
  styleUrls  : ['./check-numbers.component.scss']
})
export class CheckNumbersComponent implements OnInit {


  markedNumbers: any[] = [];

  ngOnInit(): void {

  }

  constructor(public dialogService: DialogService, public messageService: MessageService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    console.log(config.data);
    this.markedNumbers = config.data.markedNumbers;
  }

}
