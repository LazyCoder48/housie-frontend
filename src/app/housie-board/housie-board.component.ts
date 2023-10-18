import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckNumbersComponent } from '../check-numbers/check-numbers.component';
import { GenerateRandomNumberComponent } from '../generate-random-number/generate-random-number.component';

@Component({
  selector   : 'app-housie-board',
  templateUrl: './housie-board.component.html',
  styleUrls  : ['./housie-board.component.scss']
})
export class HousieBoardComponent implements OnInit, AfterViewInit {

  numbers: any[]                                         = [];
  housieNumber: number                                   = 0;
  housieNumbersList: number[]                            = [];
  voicesList: any                                        = [];
  loaded: boolean                                        = false;
  // IndianLanguages: any                                   = [];
  selectedLanguageIndex: number                          = 0;
  ref: DynamicDialogRef | undefined                      = undefined;
  generateRandomNumbersRef: DynamicDialogRef | undefined = undefined;
  @ViewChild('generateNumberButton', {static: false}) generateNumberButton: ElementRef | undefined;

  constructor(public dialogService: DialogService, public messageService: MessageService) {
  }

  ngAfterViewInit(): void {
    let loadingVoices = setInterval(() => {
      console.log('loading voices...');
      // if (windowVoices.length > 1) {
      if (window.speechSynthesis.getVoices()) {
        Object.assign(this.voicesList, window.speechSynthesis.getVoices());
        // this.voicesList = windowVoices;
        clearInterval(loadingVoices);
      }
    }, 100);

    // setTimeout(() => {
    //   console.log(this.voicesList);
    //   let langIndex: number = 0;
    //   this.voicesList.forEach((voice: any) => {
    //     if (voice.lang.indexOf('IN') >= 0) {
    //       this.IndianLanguages.push({
    //         lang        : voice.lang,
    //         name        : voice.name,
    //         localService: voice.localService,
    //         index       : langIndex
    //       });
    //     }
    //     langIndex++;
    //   });
    //   this.loaded = true;
    // }, 2000);
  }

  ngOnInit(): void {
    // This is the array of numbers that will be displayed on the housie board
    this.generateNumbers();
  }

  // This function generates the numbers that will be displayed on the housie board
  generateNumbers(): void {
    let num: number = 1;
    // loop for 9 lines
    for (let i: number = 1; i <= 9; i++) {
      // each line will start with empty list i.e., rows
      let rows: { number: number, selected: boolean }[] = [];
      // each row is filled with 10 numbers continuously i.e., 1-10, 11-20, ... 81-90
      for (let rowNum: number = 1; rowNum <= 10; rowNum++) {
        // each row is pushed to the empty rows list
        rows.push({number: num, selected: false});
        // increment the number by 1
        this.housieNumbersList.push(num);
        num++;
      }
      // after 10 numbers are pushed into rows list, the rows list is pushed into numbers list
      this.numbers.push(rows);
    }

  }

  selectedVoiceInput(e: any) {
    console.log(e);
    this.selectedLanguageIndex = e.value;
  }

  markedNumbers: number[]              = [];
  clickCount: number                   = 0;
  generateNumberButtonClicked: boolean = false;

  singleClickGenerateNumber(): void {
    if (!this.generateNumberButtonClicked) {
      this.generateNumberButtonClicked = true;
      // this.generateNumber();
      this.generateRandomNumbersRef    = this.dialogService.open(GenerateRandomNumberComponent, {
          header       : 'Generating Random Number!',
          width        : '70%',
          contentStyle : {overflow: 'auto'},
          baseZIndex   : 10000,
          maximizable  : false,
          closable     : false,
          closeOnEscape: false,
          data         : {
            housieNumbersList          : this.housieNumbersList,
            markedNumbers              : this.markedNumbers,
            loaded                     : this.loaded,
            generateNumberButtonClicked: this.generateNumberButtonClicked
          }
        }
      );

      this.generateRandomNumbersRef.onClose.subscribe((data: any) => {
        console.log('data on close', data);
        if (data) {
          this.housieNumber                = data.housieNumber;
          this.housieNumbersList           = data.housieNumbersList;
          this.markedNumbers               = data.markedNumbers;
          this.loaded                      = data.loaded;
          this.generateNumberButtonClicked = data.generateNumberButtonClicked;

          this.updateMarkedNumbers();
        }

      });

    } else {
      console.log('Button is already clicked');
    }
  }

  updateMarkedNumbers(): void {
    this.numbers.forEach((row: any[]) => {
      row.forEach((num: any) => {
        if (num.number === this.housieNumber) {
          num.selected = true;
        }
      });
    });

    // this.announcementOfNumber();
  }


  enableCheck: boolean     = true;
  showCheckDialog: boolean = false;

  checkNumbers(): void {
    this.enableCheck     = false;
    this.showCheckDialog = true;

    this.ref = this.dialogService.open(CheckNumbersComponent, {
      header       : 'Check/Validate Numbers!',
      width        : '70%',
      contentStyle : {overflow: 'auto'},
      baseZIndex   : 10000,
      maximizable  : false,
      closable     : true,
      closeOnEscape: false,
      data         : {
        markedNumbers: this.markedNumbers
      }

    });

    this.ref.onClose.subscribe(() => {
      this.enableCheck = true;
      this.messageService.add({severity: 'info', summary: 'Product Selected', detail: 'Closed'});
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}`});
    });

  }

  closeCheckDialog(): void {
    this.showCheckDialog = false;
  }

}
